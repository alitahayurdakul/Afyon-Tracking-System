"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetRolesDataQuery } from "@/api/queries/useGetRolesQueries";
import { PERMISSION_LABEL_MAP } from "@/consts/permissionsConsts";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createRolesTableColumns } from "@/utils/rolesListTableUtils";

import { Table } from "../common/Table";
import { CreateRolesModal } from "./create/CreateRolesModal";

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
