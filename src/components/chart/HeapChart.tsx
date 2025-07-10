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
import ChartWrapper from "./ChartWrapper";
import { axisProps, gridProps, legendProps } from "./chartConfig";
import { COLORS } from "./theme";
import { CustomTooltip } from "./CustomTooltip"; // 커스텀 툴팁 import

export const HeapChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);

  useEffect(() => {
    metricsService.getJvmHeap().then(setSeries);
  }, []);

  const edenSeries = useMemo(() => {
    return series.find((s) => {
      const id = JSON.parse(s.seriesName).id || "";
      return id === "Eden Space";
    });
  }, [series]);

  const data = useMemo(() => {
    if (!edenSeries) return [];
    const map = new Map<string, any>();
    edenSeries.dataPoints.forEach((pt) => {
      const time = new Date(pt.timestamp).toLocaleTimeString();
      if (!map.has(time)) map.set(time, { time });
      map.get(time)["eden"] = pt.value;
    });
    return Array.from(map.values());
  }, [edenSeries]);

  return (
    <ChartWrapper title="JVM Heap 사용량 (MiB)">
      <LineChart data={data}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit="MiB" />
        {/* Tooltip을 커스텀 컴포넌트로 교체 */}
        <Tooltip content={<CustomTooltip />} />
        <Legend {...legendProps} />
        {edenSeries && (
          <Line
            type="monotone"
            dataKey="eden"
            name="신규 객체 할당 영역"
            dot={false}
            stroke={COLORS.orange}
          />
        )}
      </LineChart>
    </ChartWrapper>
  );
};
