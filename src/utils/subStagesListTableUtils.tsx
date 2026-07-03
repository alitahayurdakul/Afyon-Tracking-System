import React from "react";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { SubStagesTableActionsCol } from "@/components/subStages/SubStagesTableActionsCol";
import styles from "@/styles/components/subStages/SubStagesListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { ISubStageMaterial, ISubStageType } from "@/types/subStagesTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

export const subStagesTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "description",
    label: "description"
  },
  {
    name: "materials",
    label: "materials",
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

export const createSubStagesTableColumns = (t: TFunction) => {
  const columns = subStagesTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: ISubStageType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <DynamicTextWithTooltip
              text={r.name || "-"}
              lines={1}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "description") {
          return (
            <DynamicTextWithTooltip
                text={r.description}
              />
          );
        }
        if (column.name === "materials") {
          const materials = r.materials ?? [];
          return (
            <DynamicTextWithTooltip
                contentBody={
                  <ul className={styles["wagon-list-container"]}>
                    {materials.map((material: ISubStageMaterial, index: number) => (
                      <React.Fragment key={index}>
                        <li>{material.name}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                }
              />
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.creator || "Admin"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>{formatDate(r.createdAt)}</p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.lastUpdatedBy || "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>{!isUnedited ? formatDate(r.updatedAt) : "-"}</p>
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
