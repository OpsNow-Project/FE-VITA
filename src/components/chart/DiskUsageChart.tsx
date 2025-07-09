import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { MetricSeries } from "../../types/metrics";
import { metricsService } from "../../api/metricService";
import ChartWrapper from "./ChartWrapper";
import { axisProps, gridProps, tooltipProps, legendProps } from "./chartConfig";
import { COLORS, formatValue } from "./theme";

export const DiskUsageChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);
  useEffect(() => {
    metricsService.getDiskUsage().then(setSeries);
  }, []);

  const data =
    series[0]?.dataPoints.map((pt) => ({
      time: new Date(pt.timestamp).toLocaleTimeString(),
      value: pt.value,
    })) ?? [];

  return (
    <ChartWrapper title="Disk 사용률 (%)">
      <LineChart data={data}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit="%" />
        <Tooltip
          {...tooltipProps}
          formatter={(v: number) => formatValue(v, "%")}
        />
        <Legend {...legendProps} />
        <Line
          type="monotone"
          dataKey="value"
          name="Disk Usage"
          dot={false}
          stroke={COLORS.green}
        />
      </LineChart>
    </ChartWrapper>
  );
};
