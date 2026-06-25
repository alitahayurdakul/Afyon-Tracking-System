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
import { formatDate } from "./formDate";

export const stagesTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Aşama Adı",
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

export const createStagesTableColumns = (
  t?: TFunction,
) => {
  const columns = stagesTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return (
          <div>{t ? t(`columns.${column.name}`) : column.label}</div>
        );
      },
      cell: ({ row }: any) => {
        if (column.name === "name") {
          return (
            <div className={styles["stage-name"]}>
              <p>{row.original[column.name] || "-"}</p>
              <p>{row.original.desc || "-"}</p>
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <p className={styles["creator-name"]}>
                {/*row.original[column.name] ||*/ "Admin"}
              </p>
              <p className={styles["creator-date"]}>
                {formatDate(row.original.createdAt) || "-"}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          return (
            <div>
              <p className={styles["creator-name"]}>
                {/*row.original.editor || */ "Admin"}
              </p>
              <p className={styles["creator-date"]}>
                {formatDate(row.original.updatedAt) || "-"}
              </p>
            </div>
          );
        }

        if (column.name === "actions") {
          return <StagesTableActionsCol id={row.original._id}/>
        }

        return <div style={{ color: column.color ?? column.color }}>-</div>;
      },
    })),
  ];
};
