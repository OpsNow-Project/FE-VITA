// src/components/charts/ChartWrapper.tsx
import React from "react";
import { ResponsiveContainer } from "recharts";

export interface ChartWrapperProps {
  title: string;
  height?: number;
  children: React.ReactElement;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  height = 300,
  children,
}) => (
  <div
    style={{
      backgroundColor: "#1f1f1f",
      borderRadius: 4,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        padding: "8px 12px",
        color: "#fff",
        fontWeight: 500,
      }}
    >
      {title}
    </div>
    <div style={{ width: "100%", height, paddingRight: "10px" }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

export default ChartWrapper;
