import React, { useState } from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!active || !payload || payload.length === 0) return null;

  const dataToShow = hoveredIndex !== null ? payload[hoveredIndex] : payload[0];

  return (
    <div
      style={{
        backgroundColor: "#222",
        border: "1px solid #444",
        borderRadius: 4,
        color: "#fff",
        padding: 6,
        fontSize: 10, // 폰트 작게
        maxWidth: 140, // 최대 너비 작게
      }}
    >
      <div style={{ marginBottom: 4, fontSize: 11 }}>{label}</div>

      <div style={{ fontWeight: "bold", marginBottom: 6, fontSize: 13 }}>
        {dataToShow.name}: {dataToShow.value.toFixed(3)}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {payload.map((entry, idx) => (
          <div
            key={entry.name}
            style={{
              cursor: "pointer",
              color: hoveredIndex === idx ? "yellow" : "white",
              fontWeight: hoveredIndex === idx ? "bold" : "normal",
              fontSize: 12,
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          ></div>
        ))}
      </div>
    </div>
  );
};
