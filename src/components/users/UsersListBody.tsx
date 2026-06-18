"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/users/UserListBody.module.scss";
import { Table } from "../common/Table";
import { createUsersTableColumns } from "@/utils/usersListTableUtils";
import { CreateUsersModal } from "./create/CreateUsersModal";
import { useGetUsersDataQuery } from "@/api/queries/useGetUsersQueries";

export const UsersListBody = () => {
  const { data, isLoading } = useGetUsersDataQuery();
  const rows = data?.users ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Kullanıcılar</h2>
          <p>Sistem kullanıcılarını ve rollerini merkezi olarak yönetin.</p>
        </div>

        <CreateUsersModal />
      </div>

      <div className={styles.toolbar}>
        <div className={styles["search-input"]}>
          <FontAwesomeIcon icon={faSearch} />
          <input placeholder="Arama..." />
        </div>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          loading={isLoading}
          data={rows}
          columns={createUsersTableColumns()}
        />
      </div>
    </section>
  );
};
