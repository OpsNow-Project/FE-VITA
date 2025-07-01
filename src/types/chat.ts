export type Message = {
  type: "bot" | "user";
  time: string;
  content: string | React.ReactNode;
  anim?: boolean;
};

export interface Pod {
  podName: string;
  podId: string;
  nameSpace: string;
}

export interface PodDTO {
  podName: string;
  podId: string;
  nameSpace: string;
  cpu: number;                // 단위: cores
  memory: number;             // 단위: MiB
  networkReceive: number;     // 단위: bytes/sec
  networkTransmit: number;    // 단위: bytes/sec
  nodeName: string;           // 파드가 실행 중인 노드 이름
  uid: string;                // 파드 UID
  createdAt: string;          // 생성 시간 (ISO 8601 문자열)
  status: string;             // 상태 (Running, Pending 등)
  restartCount: number;       // 재시작 횟수
}

export interface ClusterSummaryData {
  nodeReadyCount: number;
  podRunningCount: number;
  podPendingCount: number;
  podFailedCount: number;
  nodeCpuCapacity: number;
  nodeCpuAllocatable: number;
  nodeCpuUsage: Record<string, number>;
  nodeMemoryCapacity: number;
  nodeMemoryAllocatable: number;
  nodeMemoryUsage: Record<string, number>;
  networkTransmit: Record<string, number>;
  networkReceive: Record<string, number>;
  volumeUsagePercent: Record<string, number>;
} 