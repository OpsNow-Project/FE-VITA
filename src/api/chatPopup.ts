import { ApiClient } from "./apiClients";
import type { PodDTO } from "../types/chat";

export const chatPopupApi = new ApiClient("http://localhost:8080");

export const fetchClusterSummary = () =>
  chatPopupApi.get<string>("/metrics/cluster-summary");

export const fetchPodList = () =>
  chatPopupApi.get<Array<{ podName: string; podId: string; nameSpace: string }>>("/pod/list");

export const fetchPodInfo = (podName: string, nameSpace: string) =>
  chatPopupApi.get<PodDTO>(`/pod/info?podName=${encodeURIComponent(podName)}&nameSpace=${encodeURIComponent(nameSpace)}`);