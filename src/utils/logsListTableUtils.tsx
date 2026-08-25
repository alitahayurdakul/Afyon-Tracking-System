import clsx from "clsx";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { LOG_ACTION_CATEGORY } from "@/consts/logsConsts";
import { TFunction } from "@/types/commonTypes";
import { ILogType } from "@/types/logsTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

import styles from "@/styles/components/logs/LogsListTableUtils.module.scss";

export const logsTableColumns: ICommonTableColumnsTypes = [
  { name: "userId", label: "userId" },
  { name: "fullname", label: "fullname" },
  { name: "operationTime", label: "operationTime" },
  { name: "action", label: "action" },
];

export const createLogsTableColumns = (t: TFunction) => {
  const columns = logsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{t(`table.${column.label}`)}</div>,
      cell: ({ row }: { row: { original: ILogType } }) => {
        const r = row.original;

        if (column.name === "userId") {
          return (
            <DynamicTextWithTooltip
              text={r.userId || "-"}
              lines={1}
              textClassName={styles["cell-mono"]}
            />
          );
        }

        if (column.name === "fullname") {
          return (
            <DynamicTextWithTooltip
              text={r.fullname || "-"}
              lines={1}
              textClassName={styles["primary-text"]}
            />
          );
        }

        if (column.name === "operationTime") {
          return (
            <p className={styles["time-text"]}>
              {formatDate(r.operationTime)}
            </p>
          );
        }

        if (column.name === "action") {
          const category = LOG_ACTION_CATEGORY[r.action] ?? "neutral";

          return (
            <span
              className={clsx(styles["action-badge"], styles[category])}
            >
              {t(`actions.${r.action}`)}
            </span>
          );
        }

        return <div>-</div>;
      },
    })),
  ];
};
