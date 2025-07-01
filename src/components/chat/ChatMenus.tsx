import React from 'react';

interface ChatMenusProps {
  onSystemStatus: () => void;
  onPodCheck: () => void;
  onBackToMain: () => void;
}

export const MainMenu: React.FC<ChatMenusProps> = ({ onSystemStatus, onPodCheck }) => (
  <div>
    <div className="font-semibold mb-1">무엇을 도와드릴까요? 메뉴 중 클릭해주세요.</div>
    <hr className="my-3 border-gray-300" />
    <div className="flex flex-col gap-2">
      <button
        className="px-3 py-1 bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 text-sm font-medium shadow"
        onClick={onSystemStatus}
      >
        현재 시스템 상태 요약
      </button>
      <button
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium shadow"
        onClick={onPodCheck}
      >
        특정 Pod 점검
      </button>
    </div>
  </div>
);

export const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <button
    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium shadow"
    onClick={onBack}
  >
    돌아가기
  </button>
);

export const WelcomeMessage: React.FC<ChatMenusProps> = ({ onSystemStatus, onPodCheck }) => (
  <div>
    <div className="font-semibold mb-1">안녕하세요!<br/>무엇을 도와드릴까요? 메뉴 중 클릭해주세요.</div>
    <hr className="my-3 border-gray-300" />
    <div className="flex flex-col gap-2">
      <button
        className="px-3 py-1 bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 text-sm font-medium shadow"
        onClick={onSystemStatus}
      >
        현재 시스템 상태 요약
      </button>
      <button
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium shadow"
        onClick={onPodCheck}
      >
        특정 Pod 점검
      </button>
    </div>
  </div>
); 