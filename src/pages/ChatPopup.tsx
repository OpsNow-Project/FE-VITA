import React from "react";

export const ChatPopup = () => {
  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white text-black p-4 rounded-xl shadow-xl z-50">
      <h4 className="font-bold mb-2">상담사에게 문의하기</h4>
      <p className="text-sm">무엇을 도와드릴까요?</p>
      {/* 여기에 폼이나 메시지 추가 가능 */}
    </div>
  );
};
