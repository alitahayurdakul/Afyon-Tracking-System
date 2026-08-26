"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetTableProjectsDataQuery } from "@/api/queries/useGetProjectsQueries";
import { usePaginationParams } from "@/api/queries/usePaginationParams";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/consts/tableConsts";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { currentPageController } from "@/utils/currentPageController";
import { createProjectsTableColumns } from "@/utils/projectsListTableUtils";

import { Pagination } from "../common/Pagination";
import { Table } from "../common/Table";

import { CreateProjectsModal } from "./create/CreateProjectsModal";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const ProjectsListBody = () => {
  const t = useTranslations("projects");
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationParams();

  const { search, inputValue, setInputValue, clearSearch } =
    useSearchQueryParam();

  const { data, isLoading, isFetching, isError } = useGetTableProjectsDataQuery({
    currentPage,
    pageSize,
    search,
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

        <CreateProjectsModal />
      </div>

      <div className={styles.toolbar}>
        <div className={styles["search-input"]}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={t("search")}
            aria-label={t("searchLabel")}
          />
          {inputValue && (
            <button
              type="button"
              className={styles["search-clear"]}
              onClick={clearSearch}
              aria-label={t("searchClear")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
      </div>

      <div className={styles["table-card"]}>
        <Table
          className={styles["table-class"]}
          draggableClassActive
          loading={isLoading || isFetching}
          data={data?.data || []}
          columns={createProjectsTableColumns(t)}
          isError={isError}
          currentPage={safePage}
          pageSize={pageSize}
          totalCount={data?.totalCount}
          onPageChange={setCurrentPage}
          noDataLabel={
            search ? t("noSearchResult", { query: search }) : undefined
          }
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
