"use client";

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetWorkflowsDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";
import { createStagesTableColumns } from "@/utils/stagesListTableUtils";

import { Table } from "../common/Table";
import { CreateStageModal } from "./create/CreateStageModal";

export const StagesListBody = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetWorkflowsDataQuery<IWorkflowResponseTypes[]>();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>

          <h2>Aşamalar Yönetimi</h2>

          <p>
            Aşamaları yapılandır ve sırala.
          </p>
        </div>

        <CreateStageModal />
        
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
          columns={createStagesTableColumns()}
        />
      </div>
    </section>
  );
};
