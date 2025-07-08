// Dashboard.tsx
import { useEffect, useState } from "react";
import { GrafanaPanel } from "../components/GrafanaPanel";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { PodTable } from "../components/PodTable";

function buildUrls(from: number, to: number) {
  const base = import.meta.env.VITE_GRAFANA_BASE_URL;
  const common = `?orgId=1&from=${from}&to=${to}`;
  return [
    { panelId: 4, title: "CPU" },
    { panelId: 3, title: "Memory" },
    { panelId: 2, title: "Disk" },
    { panelId: 1, title: "Network" },
  ].map(({ panelId, title }) => ({
    title,
    src: `${base}${common}&panelId=${panelId}`,
  }));
}

export const Dashboard = () => {
  const [range, setRange] = useState<{
    from: number;
    to: number;
  }>({
    from: Date.now() - 2 * 60 * 60 * 1000,
    to: Date.now(),
  });

  const [urls, setUrls] = useState(buildUrls(range.from, range.to));

  // 1분마다 time-window를 재계산해서 urls 갱신
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setRange({ from: now - 2 * 60 * 60 * 1000, to: now });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setUrls(buildUrls(range.from, range.to));
  }, [range]);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {urls.map(({ src, title }) => (
          <GrafanaPanel
            key={src}
            src={src}
            title={title}
            width="100%"
            height="320px"
          />
        ))}
      </div>
      <PodTable />
    </DashboardLayout>
  );
};
