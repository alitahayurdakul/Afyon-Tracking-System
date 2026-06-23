"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/common/TableListBody.module.scss";
import { Table } from "../common/Table";
import { createTrainsTableColumns } from "@/utils/trainsListTableUtils";
import { CreateTrainsModal } from "./create/CreateTrainsModal";
import { useGetTrainsDataQuery } from "@/api/queries/useGetTrainsQueries";

export const TrainsListBody = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetTrainsDataQuery();

  const rows = data?.trains ?? [];


  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>

          <h2>Tren Filosu</h2>

          <p>Filonuzu merkezi olarak yönetin.</p>
        </div>

        <CreateTrainsModal />
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
          columns={createTrainsTableColumns()}
        />
      </div>
    </section>
  );
};
