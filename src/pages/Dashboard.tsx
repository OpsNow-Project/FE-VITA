// src/pages/Dashboard.tsx
import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { PodTable } from "../components/podtable/PodTable";

// 차트 컴포넌트 import
import { CpuChart } from "../components/chart/CpuChart";
import { HeapChart } from "../components/chart/HeapChart";
import { HttpRateChart } from "../components/chart/HttpRateChart";
import { DiskUsageChart } from "../components/chart/DiskUsageChart";

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CpuChart />
        <HeapChart />
        <HttpRateChart />
        <DiskUsageChart />
      </div>
      <PodTable />
    </DashboardLayout>
  );
};
