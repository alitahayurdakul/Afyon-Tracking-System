"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetProjectsDataQuery } from "@/api/queries/useGetProjectsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createProjectsTableColumns } from "@/utils/projectsListTableUtils";

import { Table } from "../common/Table";
import { CreateProjectsModal } from "./create/CreateProjectsModal";

export const ProjectsListBody = () => {
  const { data, isLoading } = useGetProjectsDataQuery();
  const rows = data?.projects ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>Projeler</h2>
          <p>Projeleri ve durumlarını merkezi olarak yönetin.</p>
        </div>

        <CreateProjectsModal />
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
          columns={createProjectsTableColumns()}
        />
      </div>
    </section>
  );
};
