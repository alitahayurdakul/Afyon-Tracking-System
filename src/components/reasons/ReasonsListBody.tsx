"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetTableReasonsDataQuery,
} from "@/api/queries/useGetReasonsQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { IReasonResponseDataTypes } from "@/types/reasonsTypes";
import { currentPageController } from "@/utils/currentPageController";
import { createReasonsTableColumns } from "@/utils/reasonsListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import { CreateReasonsModal } from "./create/CreateReasonsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const ReasonsListBody = () => {
  const t = useTranslations("delayReasons");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();
  const { data, isLoading, isFetching, isError } =
    useGetTableReasonsDataQuery<IReasonResponseDataTypes>({
      pageSize,
      currentPage,
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
          <h2>{t("header")}</h2>
          <p>{t("description")}</p>
        </div>

        <CreateReasonsModal />
      </div>

      {/* Search bar geçici olarak devre dışı bırakıldı
      <div className={styles.toolbar}>
        <div className={styles["search-input"]}>
          <FontAwesomeIcon icon={faSearch} />
          <input placeholder={t("search")} />
        </div>
      </div>
      */}

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          draggableClassActive
          loading={isLoading || isFetching}
          data={data?.data}
          columns={createReasonsTableColumns(t)}
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
