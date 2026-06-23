import { UsersTableActionsCol } from "@/components/users/UsersTableActionsCol";
import styles from "@/styles/components/users/UsersListTableUtils.module.scss";
import {
  ICommonTableColumnsType,
  ICommonTableColumnsTypes,
} from "@/types/tableColumnTypes";
import { IUserType } from "@/types/usersTypes";

export const usersTableColumns: ICommonTableColumnsTypes = [
  { name: "_id", label: "ID" },
  { name: "fullname", label: "Ad Soyad" },
  { name: "email", label: "E-posta" },
  { name: "phone", label: "Telefon" },
  { name: "department", label: "Departman" },
  { name: "role", label: "Rol" },
  { name: "isActive", label: "Durum" },
  { name: "actions", label: "İşlemler" },
];

export const createUsersTableColumns = () => {
  const columns = usersTableColumns;

  return [
    ...columns.map((column: ICommonTableColumnsType) => ({
      accessorKey: column.name,
      header: () => <div>{column.label}</div>,
      cell: ({ row }: { row: { original: IUserType } }) => {
        const r = row.original;

        if (column.name === "_id") {
          return <div className={styles["cell-mono"]}>{r._id}</div>;
        }
        if (column.name === "fullname") {
          return (
            <div>
              <p className={styles["primary-text"]}>{r.fullname || "-"}</p>
            </div>
          );
        }
        if (column.name === "email") {
          return (
            <div className={styles["truncate-cell"]} title={r.email}>
              {r.email || "-"}
            </div>
          );
        }
        if (column.name === "phone") {
          return <div>{r.phone || "-"}</div>;
        }
        if (column.name === "department") {
          return <div>{r.department || "-"}</div>;
        }
        if (column.name === "role") {
          const roleLabel =
            typeof r.role === "string" ? r.role : r.role?.roleName;
          return <div>{roleLabel || "-"}</div>;
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
              {r.isActive ? "Aktif" : "Pasif"}
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
