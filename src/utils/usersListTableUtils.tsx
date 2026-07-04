import { DynamicTextWithTooltip } from "@/components/common/DynamicTextWithTooltip";
import { UsersTableActionsCol } from "@/components/users/UsersTableActionsCol";
import styles from "@/styles/components/users/UsersListTableUtils.module.scss";
import { TFunction } from "@/types/commonTypes";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";
import { IUserType } from "@/types/usersTypes";

export const usersTableColumns: ICommonTableColumnsTypes = [
  { name: "_id", label: "id" },
  { name: "fullname", label: "fullname" },
  { name: "email", label: "email" },
  { name: "phone", label: "phone" },
  { name: "department", label: "department" },
  { name: "role", label: "role" },
  { name: "isActive", label: "status" },
  { name: "actions", label: "actions" },
];

export const createUsersTableColumns = (t: TFunction) => {
  const columns = usersTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{t(`table.${column.label}`)}</div>,
      cell: ({ row }: { row: { original: IUserType } }) => {
        const r = row.original;

        if (column.name === "_id") {
          return (
            <DynamicTextWithTooltip
              text={r._id}
              lines={1}
              textClassName={styles["cell-mono"]}
            />
          );
        }
        if (column.name === "fullname") {
          return (
            <DynamicTextWithTooltip
              text={r.fullname || "-"}
              lines={1}
              textClassName={styles["primary-text"]}
            />
          );
        }
        if (column.name === "email") {
          return (
            <div className={styles["truncate-cell"]}>
              <DynamicTextWithTooltip
                text={r.email || "-"}
                lines={1}
                textClassName={styles["email-text"]}
              />
            </div>
          );
        }
        if (column.name === "phone") {
          return <DynamicTextWithTooltip text={r.phone || "-"} lines={1} />;
        }
        if (column.name === "department") {
          return (
            <DynamicTextWithTooltip text={r.department || "-"} lines={1} />
          );
        }
        if (column.name === "role") {
          const roleLabel =
            typeof r.role === "string" ? r.role : r.role?.roleName;
          return <DynamicTextWithTooltip text={roleLabel || "-"} lines={1} />;
        }
        if (column.name === "isActive") {
          return (
            <div
              className={
                r.isActive
                  ? styles["badge-active"]
                  : styles["badge-passive"]
              }
            >
              {r.isActive ? t("status.active") : t("status.passive")}
            </div>
          );
        }
        if (column.name === "actions") {
          return <UsersTableActionsCol id={r._id} />;
        }

        return <div>-</div>;
      },
    })),
  ];
};
