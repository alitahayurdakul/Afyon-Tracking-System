"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

import { useGetProcessTrainDetailDataQuery } from "@/api/useGetProcessTrains";
import { Table } from "@/components/common/Table";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { IProcessInstance } from "@/types/processTypes";
import { createProcessTrainsTableColumns } from "@/utils/processTrainTableUtils";

export const ProcessTableListBody = () => {
  const t = useTranslations("processTrainDetail.processTable");
  const {
    data: processInfos,
    isLoading,
    isFetching,
    isError,
  } = useGetProcessTrainDetailDataQuery<IProcessInstance[]>();

  return (
    <>
      <div className={styles["search-input"]}>
        <FontAwesomeIcon icon={faSearch} />
        <input placeholder={t("search")}/>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          draggableClassActive
          loading={isLoading || isFetching}
          data={processInfos}
          columns={createProcessTrainsTableColumns(t)}
          isError={isError}
        />
      </div>
    </>
  );
};
