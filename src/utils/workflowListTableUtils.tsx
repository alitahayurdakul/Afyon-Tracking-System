/* eslint-disable */
import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType,
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/stages/StagesListTableUtils.module.scss";
import { WorkflowTableActionsCol } from "@/components/workflows/WorkflowTableActionsCol";
import { formatDate } from "./formDate";
import { TFunction } from "@/types/commonTypes";
import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import React from "react";
import { IStageType } from "@/types/workflowTypes";

export const workflowTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "stages",
    label: "stages",
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
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: any) => {
        const r = row.original;
        if (column.name === "name") {
          return (
            <div className={styles["stage-name"]}>
              <p>{row.original[column.name] || "-"}</p>
              <p>{row.original.description || "-"}</p>
            </div>
          );
        }

        if (column.name === "stages") {
          return (
            <div className={styles["train-infos"]}>
              <DynamicTextWithTooltip
                contentBody={
                  <ul className={styles["wagon-list-container"]}>
                    {r.stages.map((stage: IStageType, index: number) => (
                      <React.Fragment key={index}>
                        <li>{stage.stageInfo.name}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                }
              />
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.creator ?? "-"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(r.createdAt)}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.editor ?? "-"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(r.updatedAt)}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <WorkflowTableActionsCol id={row.original._id} />;
        }

        return <div style={{ color: column.color ?? column.color }}>-</div>;
      },
    })),
  ];
};
