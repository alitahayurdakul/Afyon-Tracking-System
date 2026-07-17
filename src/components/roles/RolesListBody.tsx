"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetRolesDataQuery } from "@/api/queries/useGetRolesQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createRolesTableColumns } from "@/utils/rolesListTableUtils";

import { Table } from "../common/Table";
import { CreateRolesModal } from "./create/CreateRolesModal";

export const RolesListBody = () => {
  const t = useTranslations("roles");
  const { data, isLoading, isError, isFetching } = useGetRolesDataQuery();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateRolesModal />
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
          columns={createRolesTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
