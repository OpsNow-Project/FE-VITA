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
import { axisProps, gridProps, tooltipProps, legendProps } from "./chartConfig";
import { formatValue, HTTP_PALETTE } from "./theme";
import { CustomTooltip } from "./CustomTooltip";

const DISPLAY_NAME = "전체 HTTP 요청률";

export const HttpRateChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);

  useEffect(() => {
    metricsService.getHttpRate().then(setSeries);
  }, []);

  const data = useMemo(() => {
    const map = new Map<string, any>();

    series.forEach((s) => {
      const rawName = s.seriesName.trim();
      const name = rawName === "{}" || rawName === "" ? DISPLAY_NAME : rawName;

      s.dataPoints.forEach((pt) => {
        const time = new Date(pt.timestamp).toLocaleTimeString([], {
          hour12: false,
        });
        if (!map.has(time)) map.set(time, { time });
        map.get(time)[name] = pt.value;
      });
    });

    return Array.from(map.values());
  }, [series]);

  return (
    <ChartWrapper title="HTTP 요청률 (1분 평균)" height={300} mar>
      <LineChart
        data={data}
        margin={{ top: 15, right: 0, bottom: 24, left: 0 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit=" req/s" />
        <Tooltip
          content={<CustomTooltip />}
          formatter={(v: number) => formatValue(v, " req/s")}
        />
        <Legend {...legendProps} />
        {series.map((s) => {
          const rawName = s.seriesName.trim();
          const name =
            rawName === "{}" || rawName === "" ? DISPLAY_NAME : rawName;
          const color = HTTP_PALETTE[name] || "#888";

          return (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              name={name}
              dot={false}
              stroke={color.blue}
            />
          );
        })}
      </LineChart>
    </ChartWrapper>
  );
};
