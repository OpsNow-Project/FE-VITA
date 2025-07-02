import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { ChatButton } from "../components/ChatButton";
import { ChatPopup } from "../pages/ChatPopup";
import { fetchLastAnalysis } from "../api/chatPopup";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // 사이트 진입 시 분석 데이터 미리 가져와서 헤더에 반영
  useEffect(() => {
    fetchLastAnalysis().then(setAnalysis);
  }, []);

  // 채팅 버튼 클릭 시 분석 데이터 최신화
  const handleChatOpen = async () => {
    const data = await fetchLastAnalysis();
    setAnalysis(data);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header hasAnalysis={!!analysis} />
      <main className="p-6">{children}</main>

      {/* 상담 버튼 & 팝업 */}
      {chatOpen && <ChatPopup analysis={analysis} onClose={() => setChatOpen(false)} />}
      {!chatOpen && <ChatButton onClick={handleChatOpen} />}
    </div>
  );
};
