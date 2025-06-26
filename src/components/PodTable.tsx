import React, { useState } from "react";
import type { Pod } from "../types";
import { StatusBadge } from "./StatusBadge";

export const PodTable = () => {
  // 테이블 행 공통 스타일
  const cellClass = "py-3.5 px-0";
  // 임시 pod 데이터
  const pods: Pod[] = [
    {
      name: "web-frontend-7d8b9c5f4-xyz12",
      status: "Running",
      restarts: 0,
      age: "2d 4h",
      cpu: "45m",
      memory: "128Mi",
    },
    {
      name: "api-backend-6c7d8e9f0-abc34",
      status: "Pending",
      restarts: 12,
      age: "1d 8h",
    },
    {
      name: "database-5a6b7c8d9-def56",
      status: "CrashLoop",
      restarts: 1,
      age: "5d 12h",
      cpu: "120m",
      memory: "512Mi",
    },
    {
      name: "worker-queue-4b5c6d7e8-ghi78",
      status: "Running",
      restarts: 0,
      age: "5m",
    },
  ];

  // Pod 검색 기능
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPods = pods.filter(
    (pod) =>
      pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <th className="text-left py-2">Pod Name</th> {/* 왼쪽 정렬 */}
            <th className="text-left">Status</th> {/* 가운데 정렬 */}
            <th className="text-left">Restarts</th> {/* 오른쪽 정렬 */}
            <th className="text-left">Age</th>
            <th className="text-left">CPU</th>
            <th className="text-left">Memory</th>
          </tr>
        </thead>
        <tbody>
          {filteredPods.map((pod) => (
            <tr key={pod.name} className="border-b border-gray-700">
              <td className={cellClass}>{pod.name}</td>
              <td className={cellClass}>
                <StatusBadge status={pod.status} />
              </td>
              <td className={cellClass}>{pod.restarts}</td>
              <td className={cellClass}>{pod.age}</td>
              <td className={cellClass}>{pod.cpu ?? "-"}</td>
              <td className={cellClass}>{pod.memory ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
