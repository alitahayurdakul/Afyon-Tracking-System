"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetSubStagesListDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createSubStagesTableColumns } from "@/utils/subStagesListTableUtils";

import { Table } from "../common/Table";
import { CreateSubStagesModal } from "./create/CreateSubStagesModal";

export const SubStagesListBody = () => {
  const { data, isLoading } = useGetSubStagesListDataQuery();
  const rows = data?.subStages ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Alt Aşamalar</h2>
          <p>Aşamalara bağlı alt aşamaları merkezi olarak yönetin.</p>
        </div>

        <CreateSubStagesModal />
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
          columns={createSubStagesTableColumns()}
        />
      </div>
    </section>
  );
};
