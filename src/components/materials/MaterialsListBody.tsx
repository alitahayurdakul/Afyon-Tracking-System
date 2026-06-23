"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createMaterialsTableColumns } from "@/utils/materialsListTableUtils";

import { Table } from "../common/Table";
import { CreateMaterialsModal } from "./create/CreateMaterialsModal";

export const MaterialsListBody = () => {
  const { data, isLoading } = useGetMaterialsDataQuery();
  const rows = data?.materials ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Malzeme Listesi</h2>
          <p>Depo malzemelerini ve stok bilgilerini merkezi olarak yönetin.</p>
        </div>

        <CreateMaterialsModal />
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
          columns={createMaterialsTableColumns()}
        />
      </div>
    </section>
  );
};
