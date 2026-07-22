import { useTranslations } from "next-intl";

import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { RolesTableActionsCol } from "@/components/roles/RolesTableActionsCol";
import { Permission } from "@/consts/permissions";
import { TFunction } from "@/types/commonTypes";
import { IRoleType } from "@/types/rolesTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";

import { formatDate } from "./formDate";

import styles from "@/styles/components/roles/RolesListTableUtils.module.scss";

export const rolesTableColumns: ICommonTableColumnsTypes = [
  { name: "roleName", label: "roleName" },
  { name: "roleDescription", label: "roleDescription" },
  { name: "permissions", label: "permissions" },
  { name: "creator", label: "creator" },
  { name: "editor", label: "editor" },
  { name: "actions", label: "actions" },
];

export const createRolesTableColumns = (t: TFunction) => {
  const columns = rolesTableColumns;
  const tPermission = useTranslations("permissions");

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{t(`table.${column.label}`)}</div>,
      cell: ({ row }: { row: { original: IRoleType } }) => {
        const r = row.original;

        if (column.name === "roleName") {
          return (
            <DynamicTextWithTooltip
              text={r.roleName || "-"}
              lines={1}
              textClassName={styles["primary-text"]}
            />
          );
        }
        if (column.name === "roleDescription") {
          return (
            <DynamicTextWithTooltip
              text={r.roleDescription || "-"}
              textClassName={styles["muted"]}
            />
          );
        }
        if (column.name === "permissions") {
          const permissions =
            r.permissions.map((permission: Permission) => permission) ?? [];
          if (permissions.length === 0) {
            return <div className={styles["muted"]}>-</div>;
          }
          return (
            <div className={styles["permission-badges"]}>
              {permissions.map((permission: Permission, i: number) => (
                <span key={i} className={styles["permission-badge"]}>
                  {tPermission(permission)}
                </span>
              ))}
            </div>
          );
        }
        if (column.name === "creator") {
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.creator || "-"}
                lines={1}
                textClassName={styles["muted"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(r.createdAt)}
              </p>
            </div>
          );
        }
        if (column.name === "editor") {
          const isUnedited = !r.updatedAt || r.createdAt === r.updatedAt;
          if (isUnedited) {
            return <div className={styles["muted"]}>-</div>;
          }
          return (
            <div>
              <DynamicTextWithTooltip
                text={r.editor || "-"}
                lines={1}
                textClassName={styles["muted"]}
              />
              <p className={styles["creator-date"]}>
                {formatDate(r.updatedAt)}
              </p>
            </div>
          );
        }
        if (column.name === "actions") {
          return <RolesTableActionsCol id={r._id} />;
        }
        return <div>-</div>;
      },
    })),
  ];
};
