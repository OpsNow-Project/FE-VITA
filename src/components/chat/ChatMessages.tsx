import React, { useRef, useEffect } from "react";
import agentIcon from "../../assets/img/agentMessage.png";

type Message = {
  type: "bot" | "user";
  time: string;
  content: string | React.ReactNode;
  anim?: boolean;
};

type Props = {
  messages: Message[];
  loading: boolean;
  onBotAction: (action: string) => void;
};

export const ChatMessages: React.FC<Props> = ({
  messages,
  loading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#f7fafd]">
      {messages.map((msg, idx) =>
        msg.type === "bot" ? (
          <div
            key={idx}
            className={`flex items-start gap-2 mb-6 ${
              msg.anim ? "animate-fade-in-up" : ""
            }`}
          >
            <img
              src={agentIcon}
              alt="상담사"
              className="w-8 h-8 rounded-full bg-gray-100 border mt-1"
            />
            <div>
              <div
                className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base text-gray-900 max-w-2xl shadow-md"
                style={{
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  borderBottomRightRadius: 32,
                }}
              >
                {typeof msg.content === "string" ? msg.content : msg.content}
              </div>
              {/* <div className="text-[11px] text-gray-400 mt-2 ml-1">
                {msg.time}
              </div> */}
            </div>
          </div>
        ) : (
          <div
            key={idx}
            className={`flex justify-end mb-6 ${
              msg.anim ? "animate-fade-in-up" : ""
            }`}
          >
            <div>
              <div
                className="bg-blue-100 text-blue-900 rounded-2xl px-5 py-4 text-base max-w-2xl shadow-md"
                style={{
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  borderBottomLeftRadius: 32,
                }}
              >
                {msg.content}
              </div>
              <div className="text-[11px] text-right text-gray-400 mt-2 mr-1">
                {msg.time}
              </div>
            </div>
          </div>
        )
      )}
      {loading && (
        <div className="flex justify-center items-center h-16">
          <div className="border-4 border-blue-200 border-t-blue-500 rounded-full w-8 h-8 animate-spin" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
