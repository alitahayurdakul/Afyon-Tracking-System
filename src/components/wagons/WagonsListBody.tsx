"use client";

import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetWagonsDataQuery } from "@/api/queries/useGetWagonsQueries";
import { createWagonsTableColumns } from "@/utils/wagonsListTableUtils";

import { Table } from "../common/Table";

import { CreateWagonsModal } from "./create/CreateWagonsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const WagonsListBody = () => {
  const t = useTranslations("wagons");
  const { data, isLoading, isFetching, isError } = useGetWagonsDataQuery();

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
          draggableClassActive
          loading={isLoading || isFetching}
          data={data}
          columns={createWagonsTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
