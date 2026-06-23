import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/components/workflowHistory/WorkflowHistoryTableUtils.module.scss";
import { IActiveProcessType } from "@/types/processTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";
import { getElapsedTime } from "./getElapsedTime";

export const workflowHistoryTableColumns: ICommonTableColumnsTypes = [
  {
    name: "locomotiveNo",
    label: "Tren No",
  },
  {
    name: "workflowName",
    label: "Süreç Adı",
  },
  {
    name: "totalDuration",
    label: "Toplam Süre",
  },
  {
    name: "startedAt",
    label: "BAŞLAMA TARİHİ",
  },
  {
    name: "completedAt",
    label: "TAMAMLANMA TARİHİ",
  },
  {
    name: "actions",
    label: "İşlemler",
  },
];

export const createWorkflowHistoryTableColumns = (
  selectedId?: string,
  onRowClick?: (row: IActiveProcessType) => void,
) => {
  const columns = workflowHistoryTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{column.label}</div>,
      cell: ({ row }: any) => {
        const r: IActiveProcessType = row.original;
        const isSelected = selectedId === r._id;

        const wrap = (children: React.ReactNode) => (
          <div
            className={`${styles["cell"]} ${isSelected ? styles["selected"] : ""}`}
          >
            {children}
          </div>
        );

        if (column.name === "locomotiveNo") {
          return wrap(
            <p className={styles["train-name"]}>{r.locomotiveNo || "-"}</p>,
          );
        }
        if (column.name === "workflowName") {
          return wrap(
            <p className={styles["train-name"]}>
              {r.workflowName || r.fleetOwner || "-"}
            </p>,
          );
        }
        if (column.name === "totalDuration") {
          if (r.startedAt && r.completedAt) {
            return wrap(<p>{getElapsedTime(r.startedAt, r.completedAt)}</p>);
          }
          if (r.totalMinutes != null) {
            const h = Math.floor(r.totalMinutes / 60);
            const m = r.totalMinutes % 60;
            return wrap(
              <p>{`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`}</p>,
            );
          }
          return wrap(<p>-</p>);
        }
        if (column.name === "startedAt") {
          return wrap(<p>{formatDate(r.startedAt)}</p>);
        }
        if (column.name === "completedAt") {
          return wrap(<p>{formatDate(r.completedAt)}</p>);
        }
        if (column.name === "actions") {
          return wrap(
            <button
              type="button"
              className={styles["detail-btn"]}
              onClick={() => onRowClick && onRowClick(r)}
            >
              <FontAwesomeIcon icon={faEye} />
              <span>Detay</span>
            </button>,
          );
        }
        return wrap(<div>-</div>);
      },
    })),
  ];
};
