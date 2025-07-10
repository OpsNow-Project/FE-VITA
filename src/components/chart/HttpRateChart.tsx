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
import { formatValue, HTTP_PALETTE } from "./theme";

const URI_DESCRIPTION_MAP: Record<string, string> = {
  "/**": "모든 HTTP 요청 (전체 경로)",
};

export const HttpRateChart: React.FC = () => {
  const [series, setSeries] = useState<MetricSeries[]>([]);

  useEffect(() => {
    metricsService.getHttpRate().then(setSeries);
  }, []);

  const data = useMemo(() => {
    const map = new Map<string, any>();
    series.forEach((s) => {
      const labels = parseSeriesName(s.seriesName);
      const name = labels.uri || "unknown";
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

  const filteredSeries = useMemo(() => {
    return series.filter((s) => {
      const uri = parseSeriesName(s.seriesName).uri || "";
      return uri === "/**";
    });
  }, [series]);

  return (
    <ChartWrapper title="HTTP 요청률 (1분 평균)" height={300}>
      <LineChart
        data={data}
        margin={{ top: 15, right: 0, bottom: 24, left: 0 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} unit=" req/s" />
        <Tooltip
          {...tooltipProps}
          formatter={(v: number) => formatValue(v, " req/s")}
        />
        <Legend {...legendProps} />
        {filteredSeries.map((s) => {
          const uri = parseSeriesName(s.seriesName).uri || "unknown";
          const name = URI_DESCRIPTION_MAP[uri] || uri;
          const color = HTTP_PALETTE[uri] || "#888";
          return (
            <Line
              key={uri}
              type="monotone"
              dataKey={uri}
              name={name}
              dot={false}
              stroke={color}
            />
          );
        })}
      </LineChart>
    </ChartWrapper>
  );
};
