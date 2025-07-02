import React, { useEffect, useRef, useState } from "react";
import { ChatLayout } from "../components/chat/ChatLayout";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { useChatLogic } from "../hooks/useChatLogic";

function analysisToMainMessage(data: any): React.ReactNode {
  return (
    <div>
      {data.situation && <><b>상황</b><br />{data.situation}<br /><br /></>}
      {data.analysis && <><b>분석</b><br />{data.analysis}<br /><br /></>}
      {data.rootCause && <><b>원인</b><br />{data.rootCause}<br /><br /></>}
      {Array.isArray(data.recommendations) && data.recommendations.length > 0 && (
        data.recommendations.map((rec: any, idx: number) => (
          <div key={idx}>
            <b>권장 조치</b><br />{rec.description}<br /><br />
          </div>
        ))
      )}
    </div>
  );
}

function analysisToCommandMessages(data: any): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const commandSet = new Set<string>();
  if (Array.isArray(data.recommendations)) {
    data.recommendations.forEach((rec: any) => {
      if (Array.isArray(rec.commands)) {
        rec.commands.forEach((cmd: string) => {
          if (!commandSet.has(cmd)) {
            commandSet.add(cmd);
            result.push(
              <pre key={cmd} style={{ background: '#f3f4f6', borderRadius: 6, padding: 8, fontSize: 13, margin: '8px 0', whiteSpace: 'pre-wrap' }}>{cmd}</pre>
            );
          }
        });
      }
    });
  }
  return result;
}

export const ChatPopup: React.FC<{ analysis?: any; onClose?: () => void }> = ({ analysis, onClose }) => {
  const [input, setInput] = useState("");
  const { messages, addMessage, handleBotAction, initializeChat, setMessages } = useChatLogic() as any;
  const [hasAdded, setHasAdded] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  // 채팅창이 열릴 때마다 messages, hasAdded 초기화
  useEffect(() => {
    setMessages([]);
    setHasAdded(false);
  }, [analysis, setMessages]);

  // 분석 데이터가 없을 때만 기본 메시지 추가
  useEffect(() => {
    if (!analysis && !hasAdded) {
      initializeChat();
      setHasAdded(true);
    }
  }, [analysis, hasAdded, initializeChat]);

  // 분석 데이터가 있으면 메시지 1번만 추가 (중복 방지)
  useEffect(() => {
    // 예약된 타이머 해제
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (analysis && !hasAdded) {
      setHasAdded(true);
      addMessage("bot", analysisToMainMessage(analysis), true);
      const commandMsgs = analysisToCommandMessages(analysis);
      commandMsgs.forEach((msg, idx) => {
        const t = setTimeout(() => {
          addMessage("bot", msg, true);
        }, (idx + 1) * 350);
        timeoutsRef.current.push(t as any);
      });
      const t = setTimeout(() => {
        addMessage("bot", "실행할 명령어를 입력해주세요", true);
      }, (commandMsgs.length + 1) * 350);
      timeoutsRef.current.push(t as any);
    }
  }, [analysis, hasAdded, addMessage]);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
  };

  return (
    <ChatLayout>
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} loading={false} onBotAction={handleBotAction} />
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </ChatLayout>
  );
};
