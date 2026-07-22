"use client";

import { useTranslations } from "next-intl";

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetWorkflowsDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";
import { createWorkflowTableColumns } from "@/utils/workflowListTableUtils";

import { Table } from "../common/Table";

import { CreateWorkflowModal } from "./create/CreateWorkflowModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const WorkflowsListBody = () => {
  const t = useTranslations("workflows");
  const { data, isLoading, isError, isFetching } = useGetWorkflowsDataQuery<IWorkflowResponseTypes[]>();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("header")}</h2>
          <p>
            {t("description")}
          </p>
        </div>

        <CreateWorkflowModal />
        
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
          columns={createWorkflowTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
