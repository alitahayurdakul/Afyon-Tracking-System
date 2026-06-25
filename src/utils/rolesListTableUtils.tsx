import { RolesTableActionsCol } from "@/components/roles/RolesTableActionsCol";
import styles from "@/styles/components/roles/RolesListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import { IRoleType } from "@/types/rolesTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

export const rolesTableColumns: ICommonTableColumnsTypes = [
  { name: "roleName", label: "roleName" },
  { name: "roleDescription", label: "roleDescription" },
  { name: "permissions", label: "permissions" },
  { name: "editor", label: "editor" },
  { name: "actions", label: "actions" },
];

const resolvePermissionLabels = (
  list: string[] | undefined,
  map: Map<string, string>,
): string[] => {
  if (!list) return [];
  return list.map((p) => map.get(p) ?? p);
};

export const createRolesTableColumns = (
  t: TFunction,
  permissionsMap: Map<string, string> = new Map(),
) => {
  const columns = rolesTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{t(`table.${column.label}`)}</div>,
      cell: ({ row }: { row: { original: IRoleType } }) => {
        const r = row.original;

        if (column.name === "roleName") {
          return <p className={styles["primary-text"]}>{r.roleName || "-"}</p>;
        }
        if (column.name === "roleDescription") {
          return (
            <div className={styles["muted"]}>{r.roleDescription || "-"}</div>
          );
        }
        if (column.name === "permissions") {
          const labels = resolvePermissionLabels(r.permissions, permissionsMap);
          if (labels.length === 0) {
            return <div className={styles["muted"]}>-</div>;
          }
          return (
            <div className={styles["permission-badges"]}>
              {labels.map((label, i) => (
                <span key={i} className={styles["permission-badge"]}>
                  {label}
                </span>
              ))}
            </div>
          );
        }
        if (column.name === "editor") {
          return <div className={styles["muted"]}>{r.editor || "-"}</div>;
        }
        if (column.name === "actions") {
          return <RolesTableActionsCol id={r._id} />;
        }
        return <div>-</div>;
      },
    })),
  ];
};
