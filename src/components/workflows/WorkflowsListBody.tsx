"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/workflowList/WorkflowListBody.module.scss";
import { Table } from "../common/Table";
import { CreateWorkflowModal } from "./create/CreateWorkflowModal";
import { createWorkflowTableColumns } from "@/utils/workflowListTableUtils";
import { useGetWorkflowsDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";

export const WorkflowsListBody = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetWorkflowsDataQuery<IWorkflowResponseTypes[]>();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>

          <h2>İş Akışları Yönetimi</h2>

          <p>
            İş akışlarını yapılandır ve sırala. Otomatik görevleri tanımla.
          </p>
        </div>

        <CreateWorkflowModal />
        
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
          loading={false}
          data={data ?? []}
          columns={createWorkflowTableColumns()}
        />
      </div>
    </section>
  );
};
