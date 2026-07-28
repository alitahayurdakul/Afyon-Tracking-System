"use client";

import { KeyboardEvent,useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/components/common/Pagination.module.scss";

interface PaginationProps {
  currentPage: number; // 1-indeksli
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void; // hep 1-indeksli gerçek sayfa numarası bekler
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number;
}

const DOTS = "...";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const buildPageRange = (
  current: number,
  total: number,
  siblingCount: number,
): (number | typeof DOTS)[] => {
  const totalVisible = siblingCount * 2 + 5;

  if (totalVisible >= total) return range(1, total);

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 2 + siblingCount * 2);
    return [...leftRange, DOTS, total];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(total - (2 + siblingCount * 2) + 1, total);
    return [1, DOTS, ...rightRange];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, total];
};

export const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 15, 25, 50],
  siblingCount = 1,
}: PaginationProps) => {
  const t = useTranslations("layout");
  const [gotoValue, setGotoValue] = useState("");

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));

  const from = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);

  const pageRange = useMemo(
    () => buildPageRange(currentPage, pageCount, siblingCount),
    [currentPage, pageCount, siblingCount],
  );

  const commitGoto = () => {
    const num = Number(gotoValue);
    if (!num || num < 1 || num > pageCount) {
      setGotoValue("");
      return;
    }
    onPageChange(num); // dönüşüm yok
    setGotoValue("");
  };

  const handleGotoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitGoto();
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange?.(Number(e.target.value));
  };

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination-summary"]}>
        <span className={styles["pagination-summary-count"]}>
          {t("table.totalCount", { count: totalCount })}
        </span>
        <span className={styles["pagination-summary-range"]}>
          {t("table.showingRange", { from, to })}
        </span>
      </div>

      <div className={styles["pagination-group"]}>
        <button
          type="button"
          className={styles["pagination-arrow"]}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={t("table.previous")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className={styles["pagination-pages"]}>
          {pageRange.map((page, idx) =>
            page === DOTS ? (
              <span key={`dots-${idx}`} className={styles["pagination-dots"]}>
                {DOTS}
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={clsx(styles["pagination-page"], {
                  [styles["pagination-page-active"]]: page === currentPage,
                })}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className={styles["pagination-arrow"]}
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={t("table.next")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className={styles["pagination-tail"]}>
        <div className={styles["pagination-goto"]}>
          <span>{t("table.goTo")}</span>
          <input
            type="number"
            min={1}
            max={pageCount}
            value={gotoValue}
            placeholder={String(currentPage)}
            onChange={(e) => setGotoValue(e.target.value)}
            onKeyDown={handleGotoKeyDown}
          />
        </div>

        {onPageSizeChange && (
          <div className={styles["pagination-size"]}>
            <select value={pageSize} onChange={handlePageSizeChange}>
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option} / {t("table.page")}
                </option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        )}
      </div>
    </div>
  );
};