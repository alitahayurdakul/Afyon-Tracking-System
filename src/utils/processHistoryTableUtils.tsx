import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { ProcessHistoryTableActionsCol } from "@/components/processHistory/ProcessHistoryTableActionsCol";
import styles from "@/styles/components/projects/ProjectsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IProcessType } from "@/types/processTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";
import { getElapsedTime } from "./getElapsedTime";

export const processHistoryTableColumns: ICommonTableColumnsTypes = [
  {
    name: "projectName",
    label: "projectName",
    type: "text",
  },
  {
    name: "locomotiveNo",
    label: "locomotiveNo",
    type: "text",
  },
  {
    name: "wagonNo",
    label: "wagonNo",
    type: "text",
  },
  {
    name: "workflowName",
    label: "workflowName",
    type: "text",
  },
  {
    name: "description",
    label: "description",
  },
  {
    name: "totalDuration",
    label: "totalDuration",
  },
  {
    name: "startedAt",
    label: "startedAt",
    type: "date",
  },
  {
    name: "completedAt",
    label: "completedAt",
    type: "date",
  },
  {
    name: "actions",
    label: "actions",
  },
];

export const createProcessHistoryTableColumns = (t: TFunction) => {
  const columns = processHistoryTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: IProcessType } }) => {
        const r = row.original;

        if (column.type === "text") {
          return (
            <DynamicTextWithTooltip
              text={(r[column.name as keyof IProcessType] ?? "-").toString()}
              textClassName={styles["name-text"]}
            />
          );
        }

        if (column.type === "date") {
          return (
            <div>
              <p className={styles["creator-date"]}>
                {formatDate(
                  (r[column.name as keyof IProcessType] as string) ?? "-",
                )}
              </p>
            </div>
          );
        }
        if (column.name === "description") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip text={row.original.description || "-"} />
            </div>
          );
        }

        if (column.name === "actions") {
          return <ProcessHistoryTableActionsCol id={r._id} />;
        }

        if (column.name === "totalDuration") {
          return (
            <div>
              <p className={styles["creator-date"]}>
                {getElapsedTime(r.startedAt ?? "", r.completedAt ?? "")}
              </p>
            </div>
          );
        }

        return <div>-</div>;
      },
    })),
  ];
};
