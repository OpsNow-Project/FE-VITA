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
import { axisProps, gridProps, legendProps } from "./chartConfig";
import { COLORS, formatValue } from "./theme";
import { CustomTooltip } from "./CustomTooltip"; // 커스텀 툴팁 import

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
          content={<CustomTooltip />}
          formatter={(v: number) => formatValue(v, "%")}
        />
        <Legend {...legendProps} />
        <Line
          type="monotone"
          dataKey="value"
          name="Disk 사용률"
          dot={false}
          stroke={COLORS.purple}
        />
      </LineChart>
    </ChartWrapper>
  );
};
