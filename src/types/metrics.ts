export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface MetricSeries {
  seriesName: string;
  dataPoints: DataPoint[];
}

export type SeriesLabels = Record<string, string>;
