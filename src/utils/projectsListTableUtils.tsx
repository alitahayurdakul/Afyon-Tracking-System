import { ProjectsTableActionsCol } from "@/components/projects/ProjectsTableActionsCol";
import { PROJECT_STATUS_LABEL_MAP } from "@/consts/projectsConsts";
import styles from "@/styles/components/projects/ProjectsListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
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
    name: "code",
    label: "code",
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
    name: "editor",
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
        if (column.name === "status") {
          return (
            <div className={styles["reason-desc"]}>
              <p>{PROJECT_STATUS_LABEL_MAP.get(r.status) || "-"}</p>
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
          return <ProjectsTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
