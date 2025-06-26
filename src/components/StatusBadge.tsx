// src/components/StatusBadge.tsx
import React from "react";

const bgMap = {
  Running: "bg-running",
  Pending: "bg-pending",
  CrashLoop: "bg-crashloop",
};

const textMap = {
  Running: "text-running-text",
  Pending: "text-pending-text",
  CrashLoop: "text-crashloop-text",
};

export const StatusBadge: React.FC<{
  status: "Running" | "Pending" | "CrashLoop";
}> = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs ${bgMap[status]} ${textMap[status]}`}
  >
    {status}
  </span>
);
