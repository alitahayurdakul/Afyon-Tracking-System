"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetStagesDataQuery } from "@/api/queries/useGetStagesQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { IStageTableResponseDataTypes } from "@/types/stagesTypes";
import { currentPageController } from "@/utils/currentPageController";
import { createStagesTableColumns } from "@/utils/stagesListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import { CreateStageModal } from "./create/CreateStageModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const StagesListBody = () => {
  const t = useTranslations("stages");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();
  const { data, isLoading, isError, isFetching } =
    useGetStagesDataQuery<IStageTableResponseDataTypes>({
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
        <CreateStageModal />
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
          data={data?.data ?? []}
          columns={createStagesTableColumns(t)}
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
