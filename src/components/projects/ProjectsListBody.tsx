"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetProjectsDataQuery } from "@/api/queries/useGetProjectsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createProjectsTableColumns } from "@/utils/projectsListTableUtils";

import { Table } from "../common/Table";
import { CreateProjectsModal } from "./create/CreateProjectsModal";

export const ProjectsListBody = () => {
  const t = useTranslations("projects");
  const { data, isLoading } = useGetProjectsDataQuery();

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateProjectsModal />
      </div>

      <div className={styles.toolbar}>
        <div className={styles["search-input"]}>
          <FontAwesomeIcon icon={faSearch} />
          <input placeholder={t("search")} />
        </div>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          loading={isLoading}
          data={data || []}
          columns={createProjectsTableColumns(t)}
        />
      </div>
    </section>
  );
};
