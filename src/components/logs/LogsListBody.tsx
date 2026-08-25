"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { useGetLogsDataQuery } from "@/api/queries/useGetLogsQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { currentPageController } from "@/utils/currentPageController";
import { createLogsTableColumns } from "@/utils/logsListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const LogsListBody = () => {
  const t = useTranslations("logs");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();
  const { data, isLoading, isFetching, isError } = useGetLogsDataQuery({
    currentPage,
    pageSize,
  });

  const safePage = currentPageController(currentPage, data?.totalPages);

  useEffect(() => {
    if (!isLoading && !isFetching && data && safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [isLoading, isFetching, data, safePage, currentPage, setCurrentPage]);

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          draggableClassActive
          loading={isLoading || isFetching}
          data={data?.data ?? []}
          columns={createLogsTableColumns(t)}
          isError={isError}
          currentPage={safePage}
          pageSize={pageSize}
          totalCount={data?.totalCount}
          onPageChange={setCurrentPage}
          paginationElement={() => (
            <Pagination
              currentPage={safePage}
              pageSize={pageSize}
              totalCount={data?.totalCount ?? 0}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
            />
          )}
        />
      </div>
    </section>
  );
};
