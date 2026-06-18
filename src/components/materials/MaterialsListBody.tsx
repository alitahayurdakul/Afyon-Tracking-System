"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/materials/MaterialListBody.module.scss";
import { Table } from "../common/Table";
import { createMaterialsTableColumns } from "@/utils/materialsListTableUtils";
import { CreateMaterialsModal } from "./create/CreateMaterialsModal";
import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";

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
