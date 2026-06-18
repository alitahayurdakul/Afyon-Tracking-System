import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType,
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/materials/MaterialsListTableUtils.module.scss";
import { MaterialsTableActionsCol } from "@/components/materials/MaterialsTableActionsCol";
import { formatDate } from "./formDate";
import { IMaterialType } from "@/types/materialsTypes";

export const materialsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Malzeme Adı",
  },
  {
    name: "code",
    label: "Malzeme Kodu",
  },
  {
    name: "stock",
    label: "Stok",
  },
  {
    name: "creator",
    label: "Oluşturan",
  },
  {
    name: "editor",
    label: "Güncelleyen",
  },
  {
    name: "actions",
    label: "İşlemler",
  },
];

export const createMaterialsTableColumns = () => {
  const columns = materialsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{column.label}</div>;
      },
      cell: ({ row }: { row: { original: IMaterialType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.name || "-"}</p>
            </div>
          );
        }
        if (column.name === "code") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{r.code || "-"}</p>
            </div>
          );
        }
        if (column.name === "stock") {
          return (
            <div className={styles["reason-desc"]}>
              <p>
                {r.stock ?? "-"} {r.unit || ""}
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
          return <MaterialsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
