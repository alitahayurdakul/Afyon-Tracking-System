"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetUsersDataQuery } from "@/api/queries/useGetUsersQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createUsersTableColumns } from "@/utils/usersListTableUtils";

import { Table } from "../common/Table";
import { CreateUsersModal } from "./create/CreateUsersModal";

export const UsersListBody = () => {
  const t = useTranslations("users");
  const { data, isLoading, isFetching, isError } = useGetUsersDataQuery();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateUsersModal />
      </div>

      <div className={styles.toolbar}>
        <div className={styles["search-input"]}>
          <FontAwesomeIcon icon={faSearch} />
          <input placeholder={t("search")} />
        </div>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          draggableClassActive
          loading={isLoading || isFetching}
          data={data ?? []}
          columns={createUsersTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
