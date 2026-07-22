import React from "react";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { TrainsTableActionsCol } from "@/components/trains/TrainsTableActionsCol";
import { TFunction } from "@/types/commonTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";
import { IWagonType } from "@/types/wagonsTypes";

import { formatDate } from "./formDate";

import styles from "@/styles/components/trains/TrainsListTableUtils.module.scss";

export const trainsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "trainSetNo",
    label: "trainSetNo",
  },
  {
    name: "description",
    label: "description",
  },
  {
    name: "wagons",
    label: "wagons",
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

export const createTrainsTableColumns = (t: TFunction) => {
  const columns = trainsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`columns.${column.label}`)}</div>;
      },
      cell: ({ row }: any) => {
        const r = row.original;

        if (column.name === "trainSetNo") {
          return (
            <div className={styles["train-name"]}>
              <DynamicTextWithTooltip
                text={r.trainSetNo || "-"}
                textClassName={styles["title-text"]}
              />
            </div>
          );
        }
        if (column.name === "description") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip text={r.desc || "-"} />
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.creator ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(r.createdAt)}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.editor ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(r.updatedAt)}
              </p>
            </div>
          );
        }

        if (column.name === "wagons") {
          return (
            <div className={styles["train-infos"]}>
              <DynamicTextWithTooltip
                contentBody={
                  <ul className={styles["wagon-list-container"]}>
                    {r.wagons.map((wagon: IWagonType, index: number) => (
                      <React.Fragment key={index}>
                        <li>{wagon.wagonNo}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                }
              />
            </div>
          );
        }

        if (column.name === "actions") {
          return <TrainsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
