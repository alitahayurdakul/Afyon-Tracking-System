/* eslint-disable */
import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/stages/StagesListTableUtils.module.scss";
import { formatDate } from "./formDate";
import { StagesTableActionsCol } from "@/components/stages/StagesTableActionsCol";

export const stageTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Aşama Adı",
  },
  {
    name: "creator",
    label: "Oluşturan",
  },
  {
    name: "editor",
    label: "Güncelleyen",
  },
  // add sub stages with popup
  {
    name: "actions",
    label: "İşlemler",
  },
];

export const createWorkflowTableColumns = () => {
  const columns = stageTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return (
          <div>{column.label}</div>
        );
      },
      cell: ({ row }: any) => {
        if (column.name === "name") {
          return (
            <div className={styles["stage-name"]}>
              <p>{row.original[column.name] || "-"}</p>
              <p>{row.original.description || "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>
                {/*row.original[column.name] ||*/ "Admin"}
              </p>
              <p className={styles["creator-date"]}>
                {formatDate(row.original.createdAt) || "-"}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          return (
            <div>
              <p className={styles["creator-name"]}>
                {/*row.original[column.name] || */ "Admin"}
              </p>
              <p className={styles["creator-date"]}>
                {formatDate(row.original.updatedAt) || "-"}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <StagesTableActionsCol id={row.original._id} />
        }

        return <div style={{ color: column.color ?? column.color }}>-</div>;
      },
    })),
  ];
};
