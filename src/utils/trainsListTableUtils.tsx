import React from "react";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { TrainsTableActionsCol } from "@/components/trains/TrainsTableActionsCol";
import styles from "@/styles/components/trains/TrainsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";
import { IWagonType } from "@/types/wagonsTypes";

import { formatDate } from "./formDate";

export const trainsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "trainSetNo",
    label: "trainSetNo",
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
              <p>{r.trainSetNo || "-"}</p>
              <p>{r.desc || "-"}</p>
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
