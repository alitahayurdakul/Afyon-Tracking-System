import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { ReasonsTableActionsCol } from "@/components/reasons/ReasonsTableActionsCol";
import styles from "@/styles/components/reasons/ReasonsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IReasonType } from "@/types/reasonsTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

export const reasonsTableColumns: ICommonTableColumnsTypes = [
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

export const createReasonsTableColumns = (t: TFunction) => {
  const columns = reasonsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: IReasonType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <DynamicTextWithTooltip
              text={r.name || "-"}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "desc") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip text={r.description || "-"} />
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.creator || "-"}
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
          const isUnedited =
            !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div>-</div>;
          }
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.editor || "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(r.updatedAt)}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <ReasonsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
