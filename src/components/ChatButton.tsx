import React from "react";
import CounselorIcon from "../assets/img/counselor.svg?react";
type Props = {
  onClick: () => void;
};

export const ChatButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 w-14 h-14 bg-chatblue hover:bg-hoverchat text-white rounded-full flex items-center justify-center shadow-lg z-50"
    aria-label="Open Chat"
  >
    <CounselorIcon className="w-6 h-6" />
  </button>
);
