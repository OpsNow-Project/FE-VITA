import React, { useEffect, useState, useMemo } from "react";
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
import { parseSeriesName } from "./utils";
import ChartWrapper from "./ChartWrapper";
import { axisProps, gridProps, tooltipProps, legendProps } from "./chartConfig";
import { COLORS, formatValue } from "./theme";

const palette = [COLORS.orange, COLORS.blue, COLORS.purple];

export const HeapChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);
  useEffect(() => {
    metricsService.getJvmHeap().then(setSeries);
  }, []);

  const data = useMemo(() => {
    const map = new Map<string, any>();
    series.forEach((s, i) => {
      const name = parseSeriesName(s.seriesName).id || `series${i}`;
      s.dataPoints.forEach((pt) => {
        const time = new Date(pt.timestamp).toLocaleTimeString();
        if (!map.has(time)) map.set(time, { time });
        map.get(time)[name] = pt.value;
      });
    });
    return Array.from(map.values());
  }, [series]);

  return (
    <ChartWrapper title="JVM 힙 사용량 (MiB)">
      <LineChart data={data}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit="MiB" />
        <Tooltip
          {...tooltipProps}
          formatter={(v: number) => formatValue(v, " MiB")}
        />
        <Legend {...legendProps} />
        {series.map((s, i) => {
          const name = parseSeriesName(s.seriesName).id || `series${i}`;
          return (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              name={name}
              dot={false}
              stroke={palette[i % palette.length]}
            />
          );
        })}
      </LineChart>
    </ChartWrapper>
  );
};
