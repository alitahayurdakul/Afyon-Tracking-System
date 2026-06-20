import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType,
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/subStages/SubStagesListTableUtils.module.scss";
import { SubStagesTableActionsCol } from "@/components/subStages/SubStagesTableActionsCol";
import { formatDate } from "./formDate";
import { ISubStageType } from "@/types/subStagesTypes";

export const subStagesTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Alt Aşama Adı",
  },
  {
    name: "stageName",
    label: "Bağlı Aşama",
  },
  {
    name: "order",
    label: "Sıra",
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

export const createSubStagesTableColumns = () => {
  const columns = subStagesTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{column.label}</div>;
      },
      cell: ({ row }: { row: { original: ISubStageType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.name || "-"}</p>
            </div>
          );
        }
        if (column.name === "stageName") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.stageName || "-"}</p>
            </div>
          );
        }
        if (column.name === "order") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.order ?? "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.creator || "Admin"}</p>
              <p className={styles["creator-date"]}>{formatDate(r.createdAt)}</p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div>-</div>;
          }
          return (
            <div>
              <p className={styles["creator-name"]}>{r.editor || "Admin"}</p>
              <p className={styles["creator-date"]}>{formatDate(r.updatedAt)}</p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <SubStagesTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
