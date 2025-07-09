import type { SeriesLabels } from "../../types/metrics";

export function parseSeriesName(jsonStr: string): SeriesLabels {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return { raw: jsonStr };
  }
}
