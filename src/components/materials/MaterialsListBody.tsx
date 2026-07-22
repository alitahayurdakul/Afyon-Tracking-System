"use client";

import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import { createMaterialsTableColumns } from "@/utils/materialsListTableUtils";

import { Table } from "../common/Table";

import { CreateMaterialsModal } from "./create/CreateMaterialsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const MaterialsListBody = () => {
  const t = useTranslations("materials");
  const { data, isLoading, isError, isFetching } = useGetMaterialsDataQuery();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("header")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateMaterialsModal />
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
          columns={createMaterialsTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
