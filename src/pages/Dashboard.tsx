import { MetricCard } from "../components/MetricCard";
import { PodTable } from "../components/PodTable";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* 차후 Grafana iframe이 들어갈 자리 */}
        <MetricCard title="CPU Usage" />
        <MetricCard title="Memory Usage" />
        <MetricCard title="Disk Usage" />
        <MetricCard title="Network Traffic" />
      </div>
      <PodTable />
    </DashboardLayout>
  );
};
