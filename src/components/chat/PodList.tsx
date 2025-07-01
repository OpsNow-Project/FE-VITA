import React from 'react';

interface Pod {
  podName: string;
  podId: string;
  nameSpace: string;
}

interface PodListProps {
  podList: Pod[];
  onPodSelect: (podName: string, nameSpace: string) => void;
}

export const PodList: React.FC<PodListProps> = ({ podList, onPodSelect }) => {
  // 네임스페이스별로 그룹화
  const grouped = podList.reduce((acc, pod) => {
    if (!acc[pod.nameSpace]) acc[pod.nameSpace] = [];
    acc[pod.nameSpace].push(pod);
    return acc;
  }, {} as Record<string, Pod[]>);

  return (
    <div>
      <div className="font-bold text-black text-base mb-2">파드를 선택해 주세요</div>
      <ul className="mt-2 pl-5">
        {Object.entries(grouped).map(([ns, pods]) => (
          <li key={ns} className="mb-2">
            <div className="font-semibold">{ns}</div>
            <ul className="pl-4 list-disc">
              {pods.map((pod, idx) => (
                <li key={pod.podId || idx}>
                  <button
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium"
                    onClick={() => onPodSelect(pod.podName, pod.nameSpace)}
                  >
                    {pod.podName}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}; 