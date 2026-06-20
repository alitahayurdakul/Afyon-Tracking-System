import {
  ICommonTableColumnsTypes,
  ICommonTableColumnsType,
} from "@/types/tableColumnTypes";

import styles from "@/styles/components/projects/ProjectsListTableUtils.module.scss";
import { ProjectsTableActionsCol } from "@/components/projects/ProjectsTableActionsCol";
import { formatDate } from "./formDate";
import { IProjectType } from "@/types/projectsTypes";
import { PROJECT_STATUS_LABEL_MAP } from "@/consts/projectsConsts";

export const projectsTableColumns: ICommonTableColumnsTypes = [
  {
    name: "name",
    label: "Proje Adı",
  },
  {
    name: "code",
    label: "Proje Kodu",
  },
  {
    name: "status",
    label: "Durum",
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

export const createProjectsTableColumns = () => {
  const columns = projectsTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => {
        return <div>{column.label}</div>;
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
