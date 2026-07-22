"use client";

import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetReasonsDataQuery } from "@/api/queries/useGetReasonsQueries";
import { IReasonsType } from "@/types/reasonsTypes";
import { createReasonsTableColumns } from "@/utils/reasonsListTableUtils";

import { Table } from "../common/Table";

import { CreateReasonsModal } from "./create/CreateReasonsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const ReasonsListBody = () => {
  const t = useTranslations("delayReasons");
  const { data, isLoading, isFetching, isError } = useGetReasonsDataQuery<IReasonsType>();

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
          draggableClassActive
          loading={isLoading || isFetching}
          data={data}
          columns={createReasonsTableColumns(t)}
          isError={isError}
        />
      </div>
    </section>
  );
};
