"use client";

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetStagesDataQuery } from "@/api/queries/useGetStagesQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { IStagesTypes } from "@/types/stagesTypes";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";
import { createStagesTableColumns } from "@/utils/stagesListTableUtils";

import { Table } from "../common/Table";
import { CreateStageModal } from "./create/CreateStageModal";

export const StagesListBody = () => {
  const t = useTranslations("stages");
  const { data, isLoading, isError, isFetching, refetch } = useGetStagesDataQuery<IStagesTypes[]>();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
        <CreateStageModal />
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
          loading={false}
          data={data ?? []}
          columns={createStagesTableColumns(t)}
        />
      </div>
    </section>
  );
};
