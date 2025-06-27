import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export const ChatInput: React.FC<Props> = ({ value, onChange, onSend, disabled }) => (
  <div className="p-4 border-t bg-white flex items-center gap-2 rounded-b-3xl">
    <input
      className="flex-1 border rounded-xl px-4 py-3 text-base focus:outline-none bg-[#f7fafd]"
      type="text"
      placeholder="CLI 명령어 입력"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => e.key === "Enter" && onSend()}
      disabled={disabled}
    />
    <button
      className="px-5 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 shadow-md"
      onClick={onSend}
      disabled={disabled || !value.trim()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-7.5-15-7.5v6l10 1.5-10 1.5v6z" />
      </svg>
    </button>
  </div>
); 