import React, { useEffect, useState, useMemo } from "react";
import { StatusBadge } from "./StatusBadge";
import { fetchPodList, fetchPodInfo } from "../api/chatPopup";
import type { PodDTO } from "../types/chat";

export const PodTable = () => {
  const cellClass = "py-3.5 px-0";
  const [pods, setPods] = useState<PodDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 정렬 상태
  const [sortKey, setSortKey] = useState<"cpu" | "memory" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchPodList().then(async (list) => {
      const details = await Promise.all(
        list.map((pod: any) =>
          fetchPodInfo(pod.podName, pod.nameSpace).catch(() => null)
        )
      );
      setPods(details.filter(Boolean) as PodDTO[]);
      setLoading(false);
    });
  }, []);

  const formatAge = (isoDate: string) => {
    const diffSec = Math.floor(
      (Date.now() - new Date(isoDate).getTime()) / 1000
    );
    if (diffSec >= 3600) {
      const h = Math.floor(diffSec / 3600);
      return `${h}시간 전`;
    }
    if (diffSec >= 60) {
      const m = Math.floor(diffSec / 60);
      const s = diffSec % 60;
      return `${m}분 ${s}초 전`;
    }
    return `${diffSec}초 전`;
  };

  const formatCPU = (cpu?: number) =>
    cpu != null ? `${(cpu * 100).toFixed(1)}%` : "-";

  const formatMemory = (mem?: number) =>
    mem != null ? `${mem.toFixed(1)}%` : "-";

  // 헤더 클릭 시 정렬 키/순서 토글
  const handleSort = (key: "cpu" | "memory") => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // 필터링 + 정렬 적용한 최종 리스트
  const displayPods = useMemo(() => {
    let list = pods.filter(
      (pod) =>
        pod.podName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pod.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = sortKey === "cpu" ? a.cpu ?? 0 : a.memory ?? 0;
        const vb = sortKey === "cpu" ? b.cpu ?? 0 : b.memory ?? 0;
        return sortOrder === "asc" ? va - vb : vb - va;
      });
    }

    return list;
  }, [pods, searchTerm, sortKey, sortOrder]);

  if (loading) return <div className="p-4 text-white">로딩 중...</div>;

  const renderSortIndicator = (key: "cpu" | "memory") => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

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
            <th
              className="text-left cursor-pointer"
              onClick={() => handleSort("cpu")}
            >
              CPU Usage (%) {renderSortIndicator("cpu")}
            </th>
            <th
              className="text-left cursor-pointer"
              onClick={() => handleSort("memory")}
            >
              Memory Usage (%) {renderSortIndicator("memory")}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayPods.map((pod) => (
            <tr key={pod.podName} className="border-b border-gray-700">
              <td className={cellClass}>{pod.podName}</td>
              <td className={cellClass}>
                <StatusBadge status={pod.status} />
              </td>
              <td className={cellClass}>{pod.restartCount}</td>
              <td className={cellClass}>{formatAge(pod.createdAt)}</td>
              <td className={cellClass}>{formatCPU(pod.cpu)}</td>
              <td className={cellClass}>{formatMemory(pod.memory)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
