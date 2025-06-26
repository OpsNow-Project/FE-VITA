import React, { useState } from "react";
import { Header } from "../components/Header";
import { ChatButton } from "../components/ChatButton";
import { ChatPopup } from "../pages/ChatPopup";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="p-6">{children}</main>

      {/* 상담 버튼 & 팝업 */}
      {chatOpen && <ChatPopup />}
      <ChatButton onClick={() => setChatOpen((prev) => !prev)} />
    </div>
  );
};
