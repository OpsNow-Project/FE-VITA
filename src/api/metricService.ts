import axios from "axios";
import type { MetricSeries } from "../types/metrics";

const BASE = "/api/metrics";

async function postRange(path: string): Promise<MetricSeries[]> {
  const now = Math.floor(Date.now() / 1000);
  const start = now - 20 * 60;
  const form = new URLSearchParams();
  const promql = {
    "/jvm/cpu": "process_cpu_usage * 100",
    "/jvm/heap": 'jvm_memory_used_bytes{area="heap"} / (1024*1024)',
    "/http/request-rate":
      "sum by (uri) (rate(http_server_requests_seconds_count[1m]))",
    "/disk/app-volume-usage":
      '100 * (1 - (disk_free_bytes{path="/app/."} / disk_total_bytes{path="/app/."}))',
  }[path]!;
  form.append("query", promql);
  form.append("start", String(start));
  form.append("end", String(now));
  form.append("step", "60s");

  const { data } = await axios.post<MetricSeries[]>(`${BASE}${path}`, form);
  return data;
}

export const metricsService = {
  getJvmCpu: () => postRange("/jvm/cpu"),
  getJvmHeap: () => postRange("/jvm/heap"),
  getHttpRate: () => postRange("/http/request-rate"),
  getDiskUsage: () => postRange("/disk/app-volume-usage"),
};
