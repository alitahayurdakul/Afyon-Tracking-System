"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetReasonsDataQuery } from "@/api/queries/useGetReasonsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createReasonsTableColumns } from "@/utils/reasonsListTableUtils";

import { Table } from "../common/Table";
import { CreateReasonsModal } from "./create/CreateReasonsModal";

export const ReasonsListBody = () => {
  const t = useTranslations("delayReasons");
  const { data, isLoading } = useGetReasonsDataQuery();
  const rows = data?.reasons ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("header")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateReasonsModal />
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
          columns={createReasonsTableColumns(t)}
        />
      </div>
    </section>
  );
};
