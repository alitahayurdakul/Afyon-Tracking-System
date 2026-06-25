import { SubStagesTableActionsCol } from "@/components/subStages/SubStagesTableActionsCol";
import styles from "@/styles/components/subStages/SubStagesListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { ISubStageType } from "@/types/subStagesTypes";
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
            <div className={styles["reason-desc"]}>
              <p>{r.name || "-"}</p>
            </div>
          );
        }
        if (column.name === "materials") {
          const materials = r.materials ?? [];
          return (
            <div className={styles["reason-desc"]}>
              <p>
                {materials.length > 0
                  ? materials.map((material) => material.label).join(", ")
                  : "-"}
              </p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r.creator || "Admin"}</p>
              <p className={styles["creator-date"]}>{formatDate(r.createdAt)}</p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div>-</div>;
          }
          return (
            <div>
              <p className={styles["creator-name"]}>{r.editor || "Admin"}</p>
              <p className={styles["creator-date"]}>{formatDate(r.updatedAt)}</p>
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
