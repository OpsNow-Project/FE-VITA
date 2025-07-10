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
import { COLORS } from "./theme";
import { CustomTooltip } from "./CustomTooltip";

export const CpuChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);
  useEffect(() => {
    metricsService.getJvmCpu().then(setSeries);
  }, []);

  const data =
    series[0]?.dataPoints.map((pt) => ({
      time: new Date(pt.timestamp).toLocaleTimeString(),
      value: pt.value,
    })) ?? [];

  return (
    <ChartWrapper title="JVM CPU 사용량">
      <LineChart data={data}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit="%" />
        <Tooltip content={<CustomTooltip />} />
        <Legend {...legendProps} />
        <Line
          type="monotone"
          dataKey="value"
          name="CPU 사용률"
          stroke={COLORS.green}
          dot={false}
        />
      </LineChart>
    </ChartWrapper>
  );
};
