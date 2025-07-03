// src/components/StatusBadge.tsx
import React from "react";

const bgMap: Record<string, string> = {
  Running: "bg-running",
  Pending: "bg-pending",
  CrashLoop: "bg-crashloop",
};

const textMap: Record<string, string> = {
  Running: "text-running-text",
  Pending: "text-pending-text",
  CrashLoop: "text-crashloop-text",
};

export const StatusBadge: React.FC<{
  status: string;
}> = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs ${bgMap[status] ?? "bg-gray-600"} ${textMap[status] ?? "text-gray-200"}`}
  >
    {status}
  </span>
);
