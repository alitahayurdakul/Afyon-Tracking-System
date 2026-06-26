/* eslint-disable */
import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/stages/StagesListTableUtils.module.scss";
import { WorkflowTableActionsCol } from "@/components/workflows/WorkflowTableActionsCol";
import { formatDate } from "./formDate";
import { TFunction } from "@/types/commonTypes";

export const workflowTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "creator",
    label: "creator",
  },
  {
    name: "editor",
    label: "editor",
  },
  {
    name: "actions",
    label: "actions",
  },
];

export const createWorkflowTableColumns = (t: TFunction) => {
  const columns = workflowTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return (
          <div>{t(`table.${column.label}`)}</div>
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
          return <WorkflowTableActionsCol id={row.original._id} />
        }

        return <div style={{ color: column.color ?? column.color }}>-</div>;
      },
    })),
  ];
};
