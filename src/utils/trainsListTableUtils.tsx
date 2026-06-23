import { TrainsTableActionsCol } from "@/components/trains/TrainsTableActionsCol";
import styles from "@/styles/components/trains/TrainsListTableUtils.module.scss";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";
export const trainsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "trainSetNo",
    label: "Tren No",
  },
  {
    name: "info",
    label: "TREN BİLGİSİ",
  },
  {
    name: "creator",
    label: "Oluşturan",
  },
  {
    name: "editor",
    label: "Güncelleyen",
  },
  {
    name: "actions",
    label: "İşlemler",
  },
];

export const createTrainsTableColumns = () => {
  const columns = trainsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{column.label}</div>;
      },
      cell: ({ row }: any) => {
        const r = row.original;

        if (column.name === "trainSetNo") {
          return (
            <div className={styles["train-name"]}>
              <p>{r.trainSetNo || "-"}</p>
              <p>{r.desc || "-"}</p>
            </div>
          );
        }
        if (column.name === "info") {
          return (
            <div className={styles["train-info"]}>
              <p className={styles["info-model"]}>{r.trainModel || "-"}</p>
              <p className={styles["info-year"]}>{r.year || "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.creator || "Admin"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(r.createdAt)}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.editor || "Admin"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(r.updatedAt)}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <TrainsTableActionsCol id={r.trainSetNo} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
