"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetTableWagonsDataQuery } from "@/api/queries/useGetWagonsQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { currentPageController } from "@/utils/currentPageController";
import { createWagonsTableColumns } from "@/utils/wagonsListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import { CreateWagonsModal } from "./create/CreateWagonsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const WagonsListBody = () => {
  const t = useTranslations("wagons");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();
  const { data, isLoading, isFetching, isError } = useGetTableWagonsDataQuery({
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

        <CreateWagonsModal />
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
          columns={createWagonsTableColumns(t)}
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
