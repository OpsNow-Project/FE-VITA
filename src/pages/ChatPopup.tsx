import React, { useEffect, useState } from "react";
import { ChatLayout } from "../components/chat/ChatLayout";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";

type Message = {
  type: "bot" | "user";
  time: string;
  content: string | React.ReactNode;
  anim?: boolean;
};

export const ChatPopup: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          type: "bot",
          time: "10:30 AM",
          content: (
            <div>
              <div className="font-semibold mb-1">안녕하세요!<br/>무엇을 도와드릴까요? 메뉴 중 클릭해주세요.</div>
              <hr className="my-3 border-gray-300" />
              <div className="flex flex-col gap-2">
                <button
                  className="px-3 py-1 bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 text-sm font-medium shadow"
                  onClick={() => handleBotAction("현재 시스템 상태 요약")}
                >
                  현재 시스템 상태 요약
                </button>
                <button
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium shadow"
                  onClick={() => handleBotAction("특정 Pod 점검")}
                >
                  특정 Pod 점검
                </button>
              </div>
            </div>
          ),
        },
      ]);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const handleBotAction = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", time: "10:32 AM", content: text, anim: true },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        text === "현재 시스템 상태 요약"
          ? {
              type: "bot",
              time: "10:33 AM",
              content: (
                <div>
                  <div>현재 상태 요약입니다.<br/>
                  • CPU: 68% (평균)<br/>
                  • Memory: 72% (평균)<br/>
                  • Network: 수신 120 MB/s, 송신 80 MB/s<br/>
                  • 디스크: 85% 사용 중<br/>
                  <br/>Pod 상태입니다.<br/>
                  • Ready: 12개<br/>
                  • CrashLoopBackOff: 2개<br/>
                  • Pending: 1개
                  </div>
                </div>
              ),
              anim: true,
            }
          : {
              type: "bot",
              time: "10:33 AM",
              content: (
                <div>
                  <div>특정 Pod 상태를 조회합니다.<br/>
                  • web-frontend: Running<br/>
                  • api-backend: Pending<br/>
                  • database: CrashLoop<br/>
                  • worker-queue: Running
                  </div>
                </div>
              ),
              anim: true,
            },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            time: "10:34 AM",
            content: (
              <div>
                <div className="font-semibold mb-1">무엇을 도와드릴까요? 메뉴 중 클릭해주세요.</div>
                <hr className="my-3 border-gray-300" />
                <div className="flex flex-col gap-2">
                  <button
                    className="px-3 py-1 bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 text-sm font-medium shadow"
                    onClick={() => handleBotAction("현재 시스템 상태 요약")}
                  >
                    현재 시스템 상태 요약
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium shadow"
                    onClick={() => handleBotAction("특정 Pod 점검")}
                  >
                    특정 Pod 점검
                  </button>
                </div>
              </div>
            ),
            anim: true,
          },
        ]);
      }, 700);
    }, 700);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { type: "user", time: "10:34 AM", content: input },
    ]);
    setInput("");
  };

  return (
    <ChatLayout>
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} loading={loading} onBotAction={handleBotAction} />
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </ChatLayout>
  );
};
