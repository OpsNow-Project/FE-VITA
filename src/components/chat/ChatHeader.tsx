import React from "react";
import agentIcon from "../../assets/img/agent.png";

type Props = {
  onClose?: () => void;
};

export const ChatHeader: React.FC<Props> = ({ onClose }) => (
  <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white rounded-t-3xl">
    <img
      src={agentIcon}
      alt="상담사"
      className="w-12 h-12 rounded-full bg-gray-100 border"
    />
    <div>
      <div className="font-bold text-lg">VITA</div>
      <div className="text-xs text-green-500">Online</div>
    </div>
    <div className="flex-1" />
    <button
      className="text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
      aria-label="닫기"
      onClick={onClose}
    >
      ×
    </button>
  </div>
);
