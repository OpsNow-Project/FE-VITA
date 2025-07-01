import React from 'react';
import { formatBytes } from '../../utils/formatters';
import type { PodDTO } from '../../types/chat';

interface PodInfoProps {
  data: PodDTO;
}

export const PodInfo: React.FC<PodInfoProps> = ({ data }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow max-w-2xl space-y-4">
    <div>
      <div className="font-bold text-lg text-blue-700 mb-2 border-b pb-1 flex items-center gap-2">
        <span>📦 Pod 상세 정보</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-500 text-xs">Pod 이름</div>
          <div className="font-bold text-lg">{data.podName}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">네임스페이스</div>
          <div className="font-bold text-lg">{data.nameSpace}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">UID</div>
          <div className="font-mono text-xs">{data.uid}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">노드</div>
          <div className="font-bold text-lg">{data.nodeName}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">생성 시간</div>
          <div className="font-mono text-xs">{data.createdAt ? new Date(data.createdAt).toLocaleString() : '-'}</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-gray-500 text-xs">상태</div>
        <div className={`font-bold text-lg ${
          data.status === 'Running' ? 'text-green-600' :
          data.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {data.status || '-'}
        </div>
      </div>
      <div>
        <div className="text-gray-500 text-xs">재시작 횟수</div>
        <div className="font-bold text-lg">{typeof data.restartCount === 'number' ? data.restartCount : '-'}</div>
      </div>
    </div>

    <div>
      <div className="font-bold text-blue-600 mb-2 flex items-center gap-1">📊 리소스 사용량</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-500 text-xs">CPU</div>
          <div className="font-bold text-lg">{typeof data.cpu === 'number' ? data.cpu.toFixed(2) : '-'} 코어</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">메모리</div>
          <div className="font-bold text-lg">{typeof data.memory === 'number' ? data.memory.toFixed(2) : '-'} MiB</div>
        </div>
      </div>
    </div>

    <div>
      <div className="font-bold text-blue-600 mb-2 flex items-center gap-1">🌐 네트워크</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-500 text-xs">수신량</div>
          <div className="font-bold text-lg">{typeof data.networkReceive === 'number' ? formatBytes(data.networkReceive) + '/sec' : '-'}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">송신량</div>
          <div className="font-bold text-lg">{typeof data.networkTransmit === 'number' ? formatBytes(data.networkTransmit) + '/sec' : '-'}</div>
        </div>
      </div>
    </div>
  </div>
); 