"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/reasons/ReasonListBody.module.scss";
import { Table } from "../common/Table";
import { createReasonsTableColumns } from "@/utils/reasonsListTableUtils";
import { CreateReasonsModal } from "./create/CreateReasonsModal";
import { useGetReasonsDataQuery } from "@/api/queries/useGetReasonsQueries";

export const ReasonsListBody = () => {
  const { data, isLoading } = useGetReasonsDataQuery();
  const rows = data?.reasons ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Gecikme Sebepleri</h2>
          <p>Gecikme sebeplerini merkezi olarak yönetin.</p>
        </div>

        <CreateReasonsModal />
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
          columns={createReasonsTableColumns()}
        />
      </div>
    </section>
  );
};
