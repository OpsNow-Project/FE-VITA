// src/components/PodTablePagination.tsx
import React from "react";

interface PodTablePaginationProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  totalPages: number;
  goToPrev: () => void;
  goToNext: () => void;
  pageSizeOptions?: number[];
}

export const PodTablePagination: React.FC<PodTablePaginationProps> = ({
  pageSize,
  setPageSize,
  currentPage,
  totalPages,
  goToPrev,
  goToNext,
  pageSizeOptions = [10, 15, 20, 50],
}) => {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <button
        onClick={goToPrev}
        className="px-2 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-40"
        disabled={currentPage === 0}
      >
        {/* ◀ */}
        &#x25C0;
      </button>
      <span className="px-2 text-sm text-gray-200">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={goToNext}
        className="px-2 py-1 rounded bg-gray-700 text-gray-200 disabled:opacity-40"
        disabled={currentPage + 1 >= totalPages}
      >
        {/* ▶ */}
        &#x25B6;
      </button>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="bg-gray-800 text-gray-100 px-3 py-1 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500"
        style={{ minWidth: 90 }}
      >
        {pageSizeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt} lines
          </option>
        ))}
      </select>
    </div>
  );
};
