// src/api/chatPopupApi.ts
import type { PodDTO } from "../types/chat";
import { ApiClient } from "./apiClients";

export const chatPopupApi = new ApiClient("");

export const fetchClusterSummary = () =>
  chatPopupApi.get<string>("/api/metrics/cluster-summary");

export const fetchPodList = () =>
  chatPopupApi.get<
    Array<{ podName: string; podId: string; nameSpace: string }>
  >("/api/pod/list");

export const fetchPodInfo = (podName: string, nameSpace: string) =>
  chatPopupApi.get<PodDTO>(
    `/api/pod/info?podName=${encodeURIComponent(
      podName
    )}&nameSpace=${encodeURIComponent(nameSpace)}`
  );

export const fetchLastAnalysis = async () => {
  try {
    return await chatPopupApi.get<any>("/api/log/analyze");
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

export const execCli = (command: string) =>
  chatPopupApi.post("/api/cli/exec", { command });
