import React, { useEffect, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { fetchPodList, fetchPodInfo } from "../api/chatPopup";
import type { PodDTO } from "../types/chat";

export const PodTable = () => {
  // 테이블 행 공통 스타일
  const cellClass = "py-3.5 px-0";
  const [pods, setPods] = useState<PodDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. pod 목록 받아오기
    fetchPodList().then(async (list) => {
      // 2. 각 pod의 상세 정보 받아오기 (병렬)
      const details = await Promise.all(
        list.map((pod: any) =>
          fetchPodInfo(pod.podName, pod.nameSpace).catch(() => null)
        )
      );
      // 3. null 제외하고 저장
      setPods(details.filter(Boolean) as PodDTO[]);
      setLoading(false);
    });
  }, []);

  const filteredPods = pods.filter(
    (pod) =>
      pod.podName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4 text-white">로딩 중...</div>;

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-bold">Pod Status Overview</h2>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>
      <table className="w-full text-white text-sm border-collapse">
        <thead className="text-gray-400 border-b border-gray-600">
          <tr>
            <th className="text-left py-2">Pod Name</th>
            <th className="text-left">Status</th>
            <th className="text-left">Restarts</th>
            <th className="text-left">Age</th>
            <th className="text-left">CPU</th>
            <th className="text-left">Memory</th>
          </tr>
        </thead>
        <tbody>
          {filteredPods.map((pod) => (
            <tr key={pod.podName} className="border-b border-gray-700">
              <td className={cellClass}>{pod.podName}</td>
              <td className={cellClass}>
                <StatusBadge status={pod.status} />
              </td>
              <td className={cellClass}>{pod.restartCount}</td>
              <td className={cellClass}>{pod.createdAt}</td>
              <td className={cellClass}>{pod.cpu ?? "-"}</td>
              <td className={cellClass}>{pod.memory ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
