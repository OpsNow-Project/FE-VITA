import type { ColDef } from "ag-grid-community";
import { PodStatusBadgeRenderer } from "./PodStatusBadgeRenderer";
import { formatAge } from "../../utils/formatters";
import type { PodDTO } from "../../types/chat";

export const podTableColumnDefs: ColDef<PodDTO, any>[] = [
  {
    headerName: "Pod Name",
    field: "podName",
    sortable: true,
    filter: "agTextColumnFilter",
    flex: 2,
    minWidth: 140,
  },
  {
    headerName: "Status",
    field: "status",
    sortable: true,
    filter: true,
    cellRenderer: PodStatusBadgeRenderer,
    minWidth: 110,
    flex: 1,
  },
  {
    headerName: "Restarts",
    field: "restartCount",
    sortable: true,
    filter: "agNumberColumnFilter",
    width: 110,
    flex: 1,
  },
  {
    headerName: "Age",
    field: "createdAt",
    sortable: true,
    valueGetter: (p) => formatAge(p.data?.createdAt),
    width: 160,
    flex: 1.1,
  },
  {
    headerName: "CPU Usage (%)",
    field: "cpu",
    sortable: true,
    filter: "agNumberColumnFilter",
    valueGetter: (p) =>
      p.data?.cpu != null ? +(p.data.cpu * 100).toFixed(1) : null,
    valueFormatter: (p) => (p.value != null ? `${p.value}%` : "-"),
    width: 130,
    flex: 1,
  },
  {
    headerName: "Memory Usage (GiB)",
    field: "memory",
    sortable: true,
    filter: "agNumberColumnFilter",
    valueGetter: (p) =>
      p.data?.memory != null ? +(p.data.memory / 1024).toFixed(2) : null,
    valueFormatter: (p) => (p.value != null ? `${p.value} GiB` : "-"),
    width: 150,
    flex: 1.3,
  },
];
