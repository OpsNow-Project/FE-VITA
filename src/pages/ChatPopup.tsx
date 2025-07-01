import React, { useEffect, useState } from "react";
import { ChatLayout } from "../components/chat/ChatLayout";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { useChatLogic } from "../hooks/useChatLogic";

export const ChatPopup: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const { loading, messages, addMessage, handleBotAction, initializeChat } = useChatLogic();

  useEffect(() => {
    initializeChat();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage("user", input);
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
