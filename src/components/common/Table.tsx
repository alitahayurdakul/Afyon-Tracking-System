import {
  Column,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Table as TypeReactTable,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

import styles from "@/styles/components/common/Table.module.scss";
import { DEFAULT_TABLE_PAGE_COUNT } from "@/utils/config";

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
  setSelectedRows,
  draggableClassActive,
  rowHeight,
  isReset,
  setIsReset,
  paginationToScrolledUp,
  setTableInstance,
  isBlockDraggable,
}: TableProps<T>) => {
  const isPaginationAvailable = currentPage || pageSize;

  const scrollRef = useRef<HTMLTableElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const pageCount = !isPaginationAvailable
    ? undefined
    : totalPage
      ? totalPage
      : data
        ? Math.ceil(data.length / (pageSize || DEFAULT_TABLE_PAGE_COUNT))
        : DEFAULT_TABLE_PAGE_COUNT;

  const table = useReactTable({
    data: data || [],
    columns: columns,
    enableColumnResizing: true,
    enablePinning,
    enableRowPinning,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    initialState: {
      pagination: {
        pageSize: pageSize,
        pageIndex: currentPage,
      },
      // columnPinning: columnPinning ? columnPinning : { left: [], right: [] }
    },
    enableRowSelection: true,
    state: {},
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
    if (!isDragging && isBlockDraggable) return;
    if (scrollRef && scrollRef?.current) {
      const x = event.pageX - scrollRef.current.offsetLeft;

      const distance = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - distance;
    }
  };

  const onScroll = (e: any) => {
    scrollRef.current!.scrollLeft = e.target.scrollLeft;
  };

  // useEffect(() => {
  //   // If paginationToScrolledUp is false, do nothing and return early
  //   if (!paginationToScrolledUp) return;

  //   // Dynamically require the eventEmitter to handle events
  //   // const eventEmitter = require("@/eventHandlers/eventEmitter").eventEmitter;

  //   // Define a handler function for when the pagination event is triggered
  //   const paginationEventHandle = (data: null) => {
  //     // Calculate the table's position relative to the viewport
  //     const tablePosition =
  //       (scrollRef?.current?.getBoundingClientRect().top ?? 0) + window.scrollY;

  //     // Scroll the window to the table's position, with a 150px offset
  //     requestAnimationFrame(() => {
  //       window.scrollTo({
  //         top: tablePosition - 150,
  //         behavior: "instant"
  //       });
  //       scrollRef?.current?.focus();
  //     });

  //     // Focus the table element after scrolling
  //     scrollRef?.current?.focus();
  //   };

  //   // Register the pagination event listener for the 'paginationToTableFocus' event
  //   eventEmitter.on("paginationToTableFocus", paginationEventHandle);

  //   // Clean up the event listener when the component is unmounted or when paginationToScrolledUp changes
  //   return () => {
  //     eventEmitter.off("paginationToTableFocus", paginationEventHandle);
  //   };
  // }, [paginationToScrolledUp]); // The effect will run when paginationToScrolledUp changes

  return (
    <>
      <div className={clsx(styles["table-wrapper"], {
        [styles["dragging"]]: isDragging && draggableClassActive
      }) }  
      ref={scrollRef}
          onScroll={onScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => {
            if (isDragging) handleMouseMove(e);
          }}
          onMouseLeave={handleMouseUp}
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
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
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
                        {loading ? (
                          <Skeleton />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
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
    // width/maxWidth/minWidth sadece pinned kolonlarda gerekli (sticky offset için)
    ...(isPinned && {
      width: column.getSize(),
      maxWidth: column.getSize(),
      minWidth: column.getSize()
    })
  };
};
