"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/common/TableListBody.module.scss";
import { Table } from "../common/Table";
import { createRolesTableColumns } from "@/utils/rolesListTableUtils";
import { CreateRolesModal } from "./create/CreateRolesModal";
import { useGetRolesDataQuery } from "@/api/queries/useGetRolesQueries";
import { PERMISSION_LABEL_MAP } from "@/consts/permissionsConsts";

export const RolesListBody = () => {
  const { data, isLoading } = useGetRolesDataQuery();
  const rows = data?.roles ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Roller</h2>
          <p>Rolleri ve sahip oldukları yetkileri yönetin.</p>
        </div>

        <CreateRolesModal />
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
          columns={createRolesTableColumns(PERMISSION_LABEL_MAP)}
        />
      </div>
    </section>
  );
};
