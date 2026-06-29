import { WagonsTableActionsCol } from "@/components/wagons/WagonsTableActionsCol";
import styles from "@/styles/components/wagons/WagonsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";
import { IWagonType } from "@/types/wagonsTypes";

import { formatDate } from "./formDate";

export const wagonsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "desc",
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

export const createWagonsTableColumns = (t: TFunction) => {
  const columns = wagonsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: IWagonType } }) => {
        const w = row.original;

        if (column.name === "name") {
          return (
            <div className={styles["wagon-desc"]}>
              <p>{w.name || "-"}</p>
            </div>
          );
        }
        if (column.name === "desc") {
          return (
            <div className={styles["wagon-desc"]}>
              <p>{w.description || "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>{w.creator || "Admin"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(w.createdAt)}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited =
            !w.updatedAt || w.createdAt === w.updatedAt;
          if (isUnedited) {
            return <div>-</div>;
          }
          return (
            <div>
              <p className={styles["creator-name"]}>{w.editor || "Admin"}</p>
              <p className={styles["creator-date"]}>
                {formatDate(w.updatedAt)}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <WagonsTableActionsCol id={w._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
