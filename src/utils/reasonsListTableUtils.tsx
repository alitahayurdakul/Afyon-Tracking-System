import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType,
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/reasons/ReasonsListTableUtils.module.scss";
import { ReasonsTableActionsCol } from "@/components/reasons/ReasonsTableActionsCol";
import { formatDate } from "./formDate";
import { IReasonType } from "@/types/reasonsTypes";

export const reasonsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Sebep Başlığı",
  },
  {
    name: "desc",
    label: "Açıklama",
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

export const createReasonsTableColumns = () => {
  const columns = reasonsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{column.label}</div>;
      },
      cell: ({ row }: { row: { original: IReasonType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.name || "-"}</p>
            </div>
          );
        }
        if (column.name === "desc") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.description || "-"}</p>
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
          const isUnedited =
            !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div>-</div>;
          }
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
          return <ReasonsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
