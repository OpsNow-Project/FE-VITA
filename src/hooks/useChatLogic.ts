import React, { useState, useRef, useCallback } from 'react';
import { fetchClusterSummary, fetchPodList, fetchPodInfo } from '../api/chatPopup';
import { ClusterSummary } from '../components/chat/ClusterSummary';
import { PodList } from '../components/chat/PodList';
import { PodInfo } from '../components/chat/PodInfo';
import { MainMenu, BackButton, WelcomeMessage } from '../components/chat/ChatMenus';

type Message = {
  type: "bot" | "user";
  time: string;
  content: string | React.ReactNode;
  anim?: boolean;
};

export const useChatLogic = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPodListActive, setIsPodListActive] = useState(false);

  const addMessage = useCallback((type: "bot" | "user", content: string | React.ReactNode, anim = false) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { type, time: currentTime, content, anim },
    ]);
  }, []);

  const handleBotActionRef = useRef<((text: string) => Promise<void>) | null>(null);

  const handleBotAction = useCallback(async (text: string) => {
    addMessage("user", text, true);
  
    if (text === "현재 시스템 상태 요약") {
      setLoading(true);
      try {
        const clusterSummary = await fetchClusterSummary();
        addMessage("bot", React.createElement(ClusterSummary, { data: clusterSummary }), true);
        
        setTimeout(() => {
          addMessage("bot", React.createElement(MainMenu, {
            onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
            onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
            onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
          }), true);
        }, 700);
      } catch (error) {
        addMessage("bot", "상태 요약을 불러오는 데 실패했습니다.", true);
      } finally {
        setLoading(false);
      }
    } else if (text === "특정 Pod 점검") {
      setLoading(true);
      try {
        const podList = await fetchPodList();
        addMessage("bot", React.createElement(PodList, {
          podList: podList,
          onPodSelect: (podName: string, nameSpace: string) => 
            handleBotActionRef.current?.(`Pod 상세: ${podName} (${nameSpace})`)
        }), true);
        
        setIsPodListActive(true);
        setTimeout(() => {
          addMessage("bot", React.createElement(BackButton, {
            onBack: () => {
              setIsPodListActive(false);
              handleBotActionRef.current?.("메인 메뉴");
            }
          }), true);
        }, 500);
      } catch (error) {
        addMessage("bot", "Pod 목록을 불러오는 데 실패했습니다.", true);
        setIsPodListActive(false);
        setTimeout(() => {
          addMessage("bot", React.createElement(MainMenu, {
            onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
            onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
            onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
          }), true);
        }, 700);
      } finally {
        setLoading(false);
      }
    } else if (text === "메인 메뉴") {
      addMessage("bot", React.createElement(MainMenu, {
        onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
        onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
        onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
      }), true);
    } else if (text.startsWith("Pod 상세: ")) {
      // Pod 상세 정보 요청 처리
      const match = text.match(/Pod 상세: (.+?) \((.+?)\)/);
      if (match) {
        const [, podName, nameSpace] = match;
        setLoading(true);
        try {
          const podInfo = await fetchPodInfo(podName, nameSpace);
          addMessage("bot", React.createElement(PodInfo, { data: podInfo }), true);
          
          setTimeout(() => {
            addMessage("bot", React.createElement(MainMenu, {
              onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
              onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
              onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
            }), true);
          }, 700);
        } catch (error) {
          addMessage("bot", `Pod 정보를 불러오는 데 실패했습니다: ${podName}`, true);
          setTimeout(() => {
            addMessage("bot", React.createElement(MainMenu, {
              onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
              onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
              onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
            }), true);
          }, 700);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setTimeout(() => {
        addMessage("bot", "알 수 없는 요청입니다.", true);
      }, 700);
      
      if (!isPodListActive) {
        setTimeout(() => {
          addMessage("bot", React.createElement(MainMenu, {
            onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
            onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
            onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
          }), true);
        }, 700);
      }
    }
  }, [addMessage, setLoading, setIsPodListActive, isPodListActive]);

  // ref에 함수 할당
  handleBotActionRef.current = handleBotAction;

  const initializeChat = useCallback(() => {
    setTimeout(() => {
      setMessages([
        {
          type: "bot",
          time: "10:30 AM",
          content: React.createElement(WelcomeMessage, {
            onSystemStatus: () => handleBotActionRef.current?.("현재 시스템 상태 요약"),
            onPodCheck: () => handleBotActionRef.current?.("특정 Pod 점검"),
            onBackToMain: () => handleBotActionRef.current?.("메인 메뉴")
          }),
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  return {
    loading,
    messages,
    addMessage,
    handleBotAction,
    initializeChat,
  };
}; 