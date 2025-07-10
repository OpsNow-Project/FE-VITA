import React from "react";

// 상태별 배경색 클래스와 텍스트색 클래스 전부 대응
const statusStyle: Record<
  string,
  { bg: string; text: string; label?: string }
> = {
  Running: { bg: "bg-running", text: "text-running-text" },
  Pending: { bg: "bg-pending", text: "text-pending-text" },
  Succeeded: { bg: "bg-green-500", text: "text-white" },
  Failed: { bg: "bg-red-600", text: "text-white" },
  CrashLoopBackOff: {
    bg: "bg-crashloop",
    text: "text-crashloop-text",
    label: "CrashLoop",
  },
  CrashLoop: { bg: "bg-crashloop", text: "text-crashloop-text" },
  Unknown: { bg: "bg-gray-600", text: "text-gray-200" },
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  // CrashLoopBackOff를 CrashLoop로 축약해서 표시(혹은 그대로)
  const style = statusStyle[status] || statusStyle["Unknown"];
  const label = style.label || status;
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
      title={status}
    >
      {label}
    </span>
  );
};
