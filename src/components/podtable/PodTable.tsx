import { useEffect, useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { fetchPodFullList } from "../../api/chatPopup";
import { podTableColumnDefs } from "./PodTableColumns";
import type { PodDTO } from "../../types/chat";
import { PodTablePagination } from "./PodTablePagination";
import { LoadingSpinner } from "../LoadingSpinner";

export const PodTable = () => {
  const [pods, setPods] = useState<PodDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);

  const gridRef = useRef<AgGridReact>(null);

  const filteredPods = useMemo(() => {
    if (!searchTerm) return pods;
    const lower = searchTerm.toLowerCase();
    return pods.filter(
      (p) =>
        p.podName.toLowerCase().includes(lower) ||
        (p.status?.toLowerCase() ?? "").includes(lower)
    );
  }, [pods, searchTerm]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.api.paginationGetPageSize();
      gridRef.current.api.paginationGoToPage(currentPage);
    }
  }, [pageSize, currentPage]);

  const totalPages = gridRef.current?.api.paginationGetTotalPages() ?? 1;

  useEffect(() => {
    fetchPodFullList()
      .then(setPods)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-800 p-3 rounded-xl">
      <div className="flex items-center justify-between mb-1 gap-3">
        <h2 className="text-white text-lg font-bold p-4 ">
          Pod Status Overview
        </h2>
        <div className="flex-1 flex justify-center">
          <PodTablePagination
            pageSize={pageSize}
            setPageSize={(sz) => {
              setPageSize(sz);
              setCurrentPage(0);
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            goToPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
            goToNext={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
          />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>
      <div className="ag-theme-alpine" style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredPods}
          columnDefs={podTableColumnDefs}
          pagination={true}
          paginationPageSize={pageSize}
          suppressPaginationPanel={true}
          domLayout="autoHeight"
          rowSelection="single"
        />
      </div>
    </div>
  );
};
