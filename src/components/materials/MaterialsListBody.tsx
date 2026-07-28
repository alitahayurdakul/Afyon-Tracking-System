"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { currentPageController } from "@/utils/currentPageController";
import { createMaterialsTableColumns } from "@/utils/materialsListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import { CreateMaterialsModal } from "./create/CreateMaterialsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const MaterialsListBody = () => {
  const t = useTranslations("materials");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();

  const { data, isLoading, isError, isFetching } = useGetMaterialsDataQuery({
    currentPage,
    pageSize,
  });

  const safePage = currentPageController(currentPage, data?.totalPages);

  // URL'deki page, totalCount'a göre aralık dışındaysa (ör. ?page=99 ama 3 sayfa var)
  // sadece bu durumda URL'i düzelt. safePage bir kez currentPage'e eşitlenince
  // koşul false olur, tekrar tetiklenmez -> loop yok.
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

        <CreateMaterialsModal />
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
          columns={createMaterialsTableColumns(t)}
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
