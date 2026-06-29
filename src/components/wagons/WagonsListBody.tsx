"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetWagonsDataQuery } from "@/api/queries/useGetWagonsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { createWagonsTableColumns } from "@/utils/wagonsListTableUtils";

import { Table } from "../common/Table";
import { CreateWagonsModal } from "./create/CreateWagonsModal";

export const WagonsListBody = () => {
  const t = useTranslations("wagons");
  const { data, isLoading } = useGetWagonsDataQuery();
  const rows = data?.wagons ?? [];

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("header")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateWagonsModal />
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
          columns={createWagonsTableColumns(t)}
        />
      </div>
    </section>
  );
};
