"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const [sizeOpen, setSizeOpen] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sizeOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (sizeRef.current && !sizeRef.current.contains(e.target as Node)) {
        setSizeOpen(false);
      }
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setSizeOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sizeOpen]);

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

  const handlePageSizeSelect = (size: number) => {
    setSizeOpen(false);
    if (size !== pageSize) onPageSizeChange?.(size);
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            aria-label={t("table.goTo")}
            value={gotoValue}
            placeholder={String(currentPage)}
            onChange={(e) =>
              setGotoValue(e.target.value.replace(/\D/g, ""))
            }
            onKeyDown={handleGotoKeyDown}
          />
        </div>

        {onPageSizeChange && (
          <div className={styles["pagination-size"]} ref={sizeRef}>
            <button
              type="button"
              className={styles["pagination-size-trigger"]}
              aria-haspopup="listbox"
              aria-expanded={sizeOpen}
              aria-label={t("table.perPage")}
              onClick={() => setSizeOpen((prev) => !prev)}
            >
              <span>
                {pageSize} / {t("table.page")}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={clsx({
                  [styles["pagination-size-chevron-open"]]: sizeOpen,
                })}
              />
            </button>

            {sizeOpen && (
              <ul className={styles["pagination-size-menu"]} role="listbox">
                {pageSizeOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === pageSize}
                      className={clsx(styles["pagination-size-option"], {
                        [styles["pagination-size-option-active"]]:
                          option === pageSize,
                      })}
                      onClick={() => handlePageSizeSelect(option)}
                    >
                      {option} / {t("table.page")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};