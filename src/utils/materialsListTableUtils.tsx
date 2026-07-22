import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { MaterialsTableActionsCol } from "@/components/materials/MaterialsTableActionsCol";
import { TFunction } from "@/types/commonTypes";
import { IMaterialType } from "@/types/materialsTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

import styles from "@/styles/components/materials/MaterialsListTableUtils.module.scss";

export const materialsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "materialCode",
    label: "code",
  },
  {
    name: "description",
    label: "description",
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

export const createMaterialsTableColumns = (t: TFunction) => {
  const columns = materialsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: IMaterialType } }) => {
        const r = row.original;

        if (column.name === "materialCode" || column.name === "name") {
          return (
            <DynamicTextWithTooltip
              text={r[column.name] || "-"}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "description") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip text={row.original.description || "-"} />
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r[column.name] ?? "-"}
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
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          return (
            <div>
              <DynamicTextWithTooltip
                text={r[column.name] ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {!isUnedited ? formatDate(r.updatedAt) : "-"}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <MaterialsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
