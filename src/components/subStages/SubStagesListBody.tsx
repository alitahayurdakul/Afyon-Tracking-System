"use client";

import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetSubStagesListDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { createSubStagesTableColumns } from "@/utils/subStagesListTableUtils";

import { Table } from "../common/Table";

import { CreateSubStagesModal } from "./create/CreateSubStagesModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const SubStagesListBody = () => {
  const t = useTranslations("subStages");
  const { data, isLoading, isError, isFetching } = useGetSubStagesListDataQuery();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateSubStagesModal />
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
          data={data}
          columns={createSubStagesTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
