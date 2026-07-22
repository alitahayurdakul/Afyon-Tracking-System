import React from "react";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import styles from "@/styles/components/trains/TrainsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IProcessType } from "@/types/processTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";
import { getElapsedTime } from "./getElapsedTime";

export const processTrainsTableColumns: ICommonTableColumnsTypes = [
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
];

export const createProcessTrainsTableColumns = (t: TFunction) => {
  const columns = processTrainsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: any) => {
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
