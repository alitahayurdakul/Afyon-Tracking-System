"use client";

import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetActiveProcessesDataQuery } from "@/api/queries/useGetProcessesQueries";
import { IProcessesTypes } from "@/types/processTypes";
import { ResponseStatusEnums } from "@/utils/enum/commonEnums";
import { createProcessHistoryTableColumns } from "@/utils/processHistoryTableUtils";

import { Table } from "../common/Table";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const ProcessHistoryListBody = () => {
  const t = useTranslations("processHistory");
  const { data, isLoading, isFetching, isError } = useGetActiveProcessesDataQuery<IProcessesTypes>(ResponseStatusEnums.completed);

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
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
          data={data || []}
          columns={createProcessHistoryTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
