import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { ProjectsTableActionsCol } from "@/components/projects/ProjectsTableActionsCol";
import { PROJECT_STATUS_OPTIONS } from "@/consts/projectsConsts";
import styles from "@/styles/components/projects/ProjectsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IOptionType } from "@/types/formTypes";
import { IProjectType } from "@/types/projectsTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

export const projectsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "name",
  },
  {
    name: "projectCode",
    label: "code",
  },
  {
    name: "description",
    label: "description",
  },
  {
    name: "status",
    label: "status",
  },
  {
    name: "creator",
    label: "creator",
  },
  {
    name: "lastUpdatedBy",
    label: "editor",
  },
  {
    name: "actions",
    label: "actions",
  },
];

export const createProjectsTableColumns = (t: TFunction) => {
  const columns = projectsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{t(`table.${column.label}`)}</div>;
      },
      cell: ({ row }: { row: { original: IProjectType } }) => {
        const r = row.original;

        if (column.name === "name") {
          return (
            <DynamicTextWithTooltip
              text={r.name || "-"}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "projectCode") {
          return (
            <DynamicTextWithTooltip
              text={r.projectCode || "-"}
              lines={1}
              textClassName={styles["name-text"]}
            />
          );
        }
        if (column.name === "status") {
          const activeStatus = PROJECT_STATUS_OPTIONS.find(
            (status: IOptionType) => r.status === status.value,
          );
          return (
            <div className={styles["reason-desc"]}>
              <p style={{ color: `var(--${activeStatus?.color})` }}>
                {t(`form.status.${activeStatus?.label}`) || "-"}
              </p>
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
        if (column.name === "description") {
          return (
            <div className={styles["desc-cell"]}>
              <DynamicTextWithTooltip text={row.original.description || "-"} />
            </div>
          );
        }
        if (column.name === "lastUpdatedBy") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div className={styles["creator-name"]}>-</div>;
          }
          return (
            <div>
              <DynamicTextWithTooltip
                text={r[column.name] ?? "-"}
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
          return <ProjectsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
