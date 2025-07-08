// GrafanaPanel.tsx
import React from "react";

interface Props {
  src: string;
  title?: string;
  width?: string;
  height?: string;
}

export const GrafanaPanel: React.FC<Props> = ({
  src,
  title = "Grafana Panel",
  width = "100%",
  height = "300px",
}) => (
  <iframe
    key={src}
    src={src}
    width={width}
    height={height}
    frameBorder="0"
    allowFullScreen
    loading="lazy"
    title={title}
  />
);