import React from 'react';
import { bytesToGB, formatBytes } from '../../utils/formatters';
import { DataRow } from '../common/DataRow';

interface ClusterSummaryData {
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

interface ClusterSummaryProps {
  data: any;
}

// 헤더 섹션
const ClusterHeader: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-lg text-blue-700 mb-2 border-b pb-1 flex items-center gap-2">
      <span>🗂️ 클러스터 요약</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-gray-500 text-xs">노드 수 (Ready)</div>
        <div className="font-bold text-xl">{data.nodeReadyCount}</div>
      </div>
      <div>
        <div className="text-gray-500 text-xs">파드 수</div>
        <div className="font-bold text-xl">
          <span className="ml-2 text-green-600">Running: {data.podRunningCount}</span>
          <br/>
          <span className="ml-2 text-yellow-600">Pending: {data.podPendingCount}</span>
          <br/>
          <span className="ml-2 text-red-600">Failed {data.podFailedCount}</span>
        </div>
      </div>
    </div>
  </div>
);

// CPU 섹션
const CpuSection: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-blue-600 mb-1 flex items-center gap-1">🧮 CPU</div>
    <div className="mb-1 text-sm text-gray-700">
      용량: <span className="font-semibold">{data.nodeCpuCapacity} 코어</span>, 할당 가능: <span className="font-semibold">{data.nodeCpuAllocatable} 코어</span>
    </div>
            <div className="text-xs text-gray-500 mb-1">노드별 사용률</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(data.nodeCpuUsage).map(([node, usage]) => (
            <DataRow
              key={node}
              label={node}
              value={`${((usage as number) * 100).toFixed(1)}%`}
              title={node}
            />
          ))}
        </div>
  </div>
);

// 메모리 섹션
const MemorySection: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-blue-600 mb-1 flex items-center gap-1">💾 메모리</div>
    <div className="mb-1 text-sm text-gray-700">
      용량: <span className="font-semibold">{bytesToGB(data.nodeMemoryCapacity)} GB</span>, 할당 가능: <span className="font-semibold">{bytesToGB(data.nodeMemoryAllocatable)} GB</span>
    </div>
    <div className="text-xs text-gray-500 mb-1">노드별 사용량</div>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(data.nodeMemoryUsage).map(([node, usage]) => (
        <div key={node} className="flex justify-between items-center bg-blue-50 rounded px-2 py-1 min-w-0">
          <span className="truncate whitespace-nowrap max-w-[320px]" title={node}>{node}</span>
          <span className="font-mono font-bold whitespace-nowrap">{bytesToGB(usage as number)}GB</span>
        </div>
      ))}
    </div>
  </div>
);

// 네트워크 송신량 섹션
const NetworkTransmitSection: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-blue-600 mb-1 flex items-center gap-1">📤 네트워크 송신량 (노드별)</div>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(data.networkTransmit).map(([node, value]) => (
        <div key={node} className="flex justify-between items-center bg-blue-50 rounded px-2 py-1 min-w-0">
          <span className="truncate whitespace-nowrap max-w-[320px]" title={node}>{node}</span>
          <span className="font-mono font-bold whitespace-nowrap">{formatBytes(value as number)}</span>
        </div>
      ))}
    </div>
  </div>
);

// 네트워크 수신량 섹션
const NetworkReceiveSection: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-blue-600 mb-1 flex items-center gap-1">📥 네트워크 수신량 (노드별)</div>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(data.networkReceive).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([node, value]) => (
        <div key={node} className="flex justify-between items-center bg-blue-50 rounded px-2 py-1 min-w-0">
          <span className="truncate whitespace-nowrap max-w-[320px]" title={node}>{node}</span>
          <span className="font-mono font-bold whitespace-nowrap">{formatBytes(value as number)}</span>
        </div>
      ))}
    </div>
  </div>
);

// 볼륨 사용량 섹션
const VolumeSection: React.FC<{ data: any }> = ({ data }) => (
  <div>
    <div className="font-bold text-blue-600 mb-1 flex items-center gap-1">💽 볼륨 사용량 (1% 이상)</div>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(data.volumeUsagePercent)
        .filter(([_, percent]) => (percent as number) >= 1.0)
        .map(([name, percent]) => (
          <div key={name} className="flex justify-between items-center bg-blue-50 rounded px-2 py-1 min-w-0">
            <span className="truncate whitespace-nowrap max-w-[320px]" title={name}>{name}</span>
            <span className="font-mono font-bold whitespace-nowrap">{(percent as number).toFixed(2)}%</span>
          </div>
        ))}
    </div>
  </div>
);

// 메인 클러스터 요약 컴포넌트
export const ClusterSummary: React.FC<ClusterSummaryProps> = ({ data }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow max-w-2xl space-y-6">
    <ClusterHeader data={data} />
    <CpuSection data={data} />
    <MemorySection data={data} />
    <NetworkTransmitSection data={data} />
    <NetworkReceiveSection data={data} />
    <VolumeSection data={data} />
  </div>
); 