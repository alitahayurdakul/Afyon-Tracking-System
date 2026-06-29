import { MaterialsTableActionsCol } from "@/components/materials/MaterialsTableActionsCol";
import styles from "@/styles/components/materials/MaterialsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IMaterialType } from "@/types/materialsTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

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

export const createMaterialsTableColumns = (t:TFunction) => {
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
            <div className={styles["reason-desc"]}>
              <p>{r[column.name] || "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{r[column.name] ?? "-"}</p>
              <p className={styles["creator-date"]}>{formatDate(r.createdAt)}</p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          return (
            <div>
              <p className={styles["creator-name"]}>{r[column.name] ?? "-"}</p>
              <p className={styles["creator-date"]}>{!isUnedited ? formatDate(r.updatedAt) : "-"}</p>
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
