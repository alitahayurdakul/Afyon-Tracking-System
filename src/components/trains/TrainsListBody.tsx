"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetTrainsDataQuery } from "@/api/queries/useGetTrainsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createTrainsTableColumns } from "@/utils/trainsListTableUtils";

import { Table } from "../common/Table";
import { CreateTrainsModal } from "./create/CreateTrainsModal";

export const TrainsListBody = () => {
  const t = useTranslations("trains");
  const { data, isLoading, isError, isFetching, refetch } =
    useGetTrainsDataQuery();

  const rows = data?.trains ?? [];


  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>

          <h2>{t("title")}</h2>

          <p>{t("description")}</p>
        </div>

        <CreateTrainsModal />
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
          data={rows}
          columns={createTrainsTableColumns(t)}
        />
      </div>
    </section>
  );
};
