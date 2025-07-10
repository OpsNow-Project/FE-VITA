export const axisProps = {
  tick: { fill: "#fff", fontSize: 12 },
  axisLine: { stroke: "#444" },
  tickLine: { stroke: "#444" },
};

export const gridProps = {
  vertical: false,
  stroke: "#333",
  strokeDasharray: "3 3",
};

export const tooltipProps = {
  wrapperStyle: { backgroundColor: "transparent", border: "none" },
  contentStyle: {
    backgroundColor: "#222",
    border: "1px solid #444",
    borderRadius: 4,
    color: "#fff",
    padding: 8,
  },
  labelStyle: { color: "#aaa" },
};

export const legendProps = {
  layout: "horizontal" as const,
  align: "left" as const,
  verticalAlign: "bottom" as const,
  wrapperStyle: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px 16px",
    color: "#fff",
    fontSize: 12,
    paddingTop: 8,
    paddingLeft: 15,
  },
};
