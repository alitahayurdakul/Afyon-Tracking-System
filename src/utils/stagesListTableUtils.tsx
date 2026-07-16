// import { TableSingleSort } from "@/components/dashboard/common/TableSingleSort";
// import { TooltipBody } from "@/components/TooltipBody";
// import { PAGE_URLS } from "@/consts/url";
// import { localizedDateConverter } from "@/functions/dateConverter";
/* eslint-disable */
import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType
} from "@/types/tableColumnTypes";
import { TFunction } from "@/types/commonTypes";

// import styles from "@/styles/components/table/CommonDashboardTable.module.scss";
import styles from "@/styles/components/stages/StagesListTableUtils.module.scss";
import { StagesTableActionsCol } from "@/components/stages/StagesTableActionsCol";
import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { formatDate } from "./formDate";

export const stagesTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
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

export const createStagesTableColumns = (t: TFunction) => {
  const columns = stagesTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: any) => {
        if (column.name === "name") {
          return (
            <div className={styles["stage-name"]}>
              <DynamicTextWithTooltip
                text={row.original[column.name] || "-"}
                textClassName={styles["title-text"]}
              />
            </div>
          );
        }
        if (column.name === "description") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip
                text={row.original.description || "-"}
              />
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={row.original[column.name] ?? "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(row.original.createdAt) || "-"}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !row.original.updatedAt || row.original.createdAt === row.original.updatedAt;
          return (
            <div>
              <DynamicTextWithTooltip
                text={row.original.editor || "-"}
                lines={1}
                textClassName={styles["creator-name"]}
              />
              <p className={styles["creator-date"]}>{!isUnedited ? formatDate(row.original.updatedAt) : "-"}</p>
            </div>
          );
        }

        if (column.name === "actions") {
          return row.original._id === "6a548d7444cc81ed74b22b6a" ? <div style={{ color: column.color ?? column.color }}>{t("form.notifications.blockedQualityStage")}</div> :
          <StagesTableActionsCol id={row.original._id}/>

        }

        return <div style={{ color: column.color ?? column.color }}>-</div>;
      },
    })),
  ];
};
