import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
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
    name: "wagonNo",
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

        if (column.name === "wagonNo") {
          return (
            <DynamicTextWithTooltip
              text={w.wagonNo || "-"}
              lines={1}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "desc") {
          return (
            <DynamicTextWithTooltip
              text={w.description || "-"}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={w.creator ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(w.createdAt) ?? "-"}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !w.updatedAt || w.createdAt === w.updatedAt;
          return (
            <div>
              <DynamicTextWithTooltip
                text={w.editor ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {!isUnedited ? formatDate(w.updatedAt) : "-"}
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
