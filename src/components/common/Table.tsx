import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

import {
  Column,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Table as TypeReactTable,
  useReactTable,
} from "@tanstack/react-table";

import { DEFAULT_TABLE_PAGE_COUNT } from "@/utils/config";

import styles from "@/styles/components/common/Table.module.scss";

interface TableProps<T> {
  tableName?: string;
  data?: T[];
  loading: boolean;
  stickyHeader?: boolean;
  columns: any[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<any>>;
  // Skeleton
  rowHeight?: string | number;

  // Pagination
  pageSize?: number;
  currentPage?: number;
  paginationElement?: (table: TypeReactTable<T>) => React.JSX.Element;
  totalPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;

  // Pinning
  enablePinning?: boolean;
  enableRowPinning?: boolean;

  extraButtonPanel?: (table: TypeReactTable<T>) => React.JSX.Element;
  className?: string;
  // manualPagination?: boolean;

  columnPinning?: ColumnPinningState;

  draggableClassActive?: boolean;
  isReset?: boolean;
  setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
  paginationToScrolledUp?: boolean;

  // instance
  setTableInstance?: React.Dispatch<React.SetStateAction<TypeReactTable<T>>>;
  isBlockDraggable?: boolean;

  // Error / Empty state
  isError?: boolean;
  errorLabel?: string;
  noDataLabel?: string;
  defaultSkeletonRowCount?: number;
}

export const Table = <T,>({
  tableName,
  data,
  className,
  loading,
  columns,
  enablePinning,
  enableRowPinning,
  paginationElement,
  extraButtonPanel,
  stickyHeader,
  pageSize,
  currentPage,
  totalPage,
  totalCount,
  onPageChange,
  setSelectedRows,
  draggableClassActive,
  isReset,
  setIsReset,
  setTableInstance,
  isBlockDraggable,
  isError,
  errorLabel,
  noDataLabel,
  defaultSkeletonRowCount,
}: TableProps<T>) => {
  const t = useTranslations("layout");
  const isPaginationAvailable =
    currentPage !== undefined || pageSize !== undefined;

  const scrollRef = useRef<HTMLTableElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const resolvedPageSize = pageSize || DEFAULT_TABLE_PAGE_COUNT;

  const pageCount = !isPaginationAvailable
    ? undefined
    : totalPage
      ? totalPage
      : totalCount !== undefined
        ? Math.max(1, Math.ceil(totalCount / resolvedPageSize))
        : data
          ? Math.ceil(data.length / resolvedPageSize)
          : DEFAULT_TABLE_PAGE_COUNT;

  const pagination: PaginationState = {
    pageIndex: (currentPage ?? 1) - 1,
    pageSize: resolvedPageSize,
  };

  console.log(pagination)

  const table = useReactTable({
    data: data || [],
    columns: columns,
    enableColumnResizing: true,
    enablePinning,
    enableRowPinning,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      onPageChange?.(next.pageIndex);
    },
    enableRowSelection: true,
    pageCount,
    getPaginationRowModel: isPaginationAvailable
      ? getPaginationRowModel()
      : undefined,
  });

  useEffect(() => {
    setTableInstance && setTableInstance(table);
  }, [setTableInstance, table]);

  useEffect(() => {
    if (isReset) {
      table.resetRowSelection();
      setIsReset && setIsReset(false);
    }
  }, [isReset]);

  const selectedRows = table?.getSelectedRowModel();

  useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(
        selectedRows?.flatRows?.map((x) => {
          return { rowId: x.id, ...x.original };
        }),
      );
    }
  }, [setSelectedRows, selectedRows, tableName]);

  const handleMouseDown = (event: any) => {
    if ((event.target as HTMLElement).closest('[data-state="open"]')) return;

    if (scrollRef && scrollRef.current && !isBlockDraggable) {
      setIsDragging(true);
      setStartX(event.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;
    if (scrollRef && scrollRef.current) {
      const x = event.pageX - scrollRef.current.offsetLeft;
      const distance = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - distance;
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const onScroll = (e: any) => {
    scrollRef.current!.scrollLeft = e.target.scrollLeft;
  };

  const skeletonRowCount =
    !!data && data.length > 0
      ? data.length
      : pageSize || (defaultSkeletonRowCount ?? 1);

  const renderTbodyContent = () => {
    if (loading) {
      return Array.from({ length: skeletonRowCount }).map((_, rowIdx) => (
        <tr key={`skeleton-row-${rowIdx}`}>
          {columns.map((_, colIdx) => (
            <td key={`skeleton-cell-${rowIdx}-${colIdx}`}>
              <Skeleton />
            </td>
          ))}
        </tr>
      ));
    }

    if (isError) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            style={{
              textAlign: "center",
              padding: "2rem 0",
              color: "var(--red-60, #d13438)",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            {errorLabel ?? t("table.error")}
          </td>
        </tr>
      );
    }

    if (table.getRowModel().rows.length === 0 && !isError) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            style={{
              textAlign: "center",
              padding: "2rem 0",
              color: "var(--base-grey-60, #9aa1a7)",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            {noDataLabel ?? t("table.noData")}
          </td>
        </tr>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => {
          const { column } = cell;

          return (
            <td
              style={{
                ...getCommonPinningStyles(column),
              }}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <div
        className={clsx(styles["table-wrapper"], {
          [styles["dragging"]]: isDragging && draggableClassActive,
        })}
        ref={scrollRef}
        onScroll={onScroll}
        onMouseDown={handleMouseDown}
      >
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
          className={clsx(styles["table"], className)}
        >
          <thead
            className={clsx(styles["head"], {
              [styles["head-sticky"]]: stickyHeader,
            })}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;

                  return (
                    <th
                      key={header.id}
                      className={clsx(
                        styles["headcol"],
                        // column.columnDef.meta?.className ?? ""
                      )}
                      style={{
                        ...getCommonPinningStyles(column),
                        maxWidth: "unset",
                        flexBasis: `${column.getSize()}`,
                        flexGrow: 1,
                        flexShrink: 0,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>{renderTbodyContent()}</tbody>
        </table>
      </div>
      <>{paginationElement && paginationElement(table)}</>
      <>{extraButtonPanel && extraButtonPanel(table)}</>
    </>
  );
};

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();

  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
    ...(isPinned && {
      width: column.getSize(),
      maxWidth: column.getSize(),
      minWidth: column.getSize(),
    }),
  };
};
