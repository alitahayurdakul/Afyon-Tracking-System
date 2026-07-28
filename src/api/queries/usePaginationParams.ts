"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_PAGE_SIZE } from "@/consts/tableConsts";

interface UsePaginationParamsOptions {
  defaultPageSize?: number;
  paramPrefix?: string;
}

export const usePaginationParams = ({
  defaultPageSize = DEFAULT_PAGE_SIZE,
  paramPrefix,
}: UsePaginationParamsOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageKey = paramPrefix ? `${paramPrefix}_page` : "page";
  const sizeKey = paramPrefix ? `${paramPrefix}_pageSize` : "pageSize";

  // Her ikisi de 1-indeksli, hiçbir yerde +1/-1 dönüşümü yok
  const currentPage = useMemo(() => {
    const raw = Number(searchParams.get(pageKey));
    return Number.isFinite(raw) && raw > 0 ? raw : 1;
  }, [searchParams, pageKey]);

  const pageSize = useMemo(() => {
    const raw = Number(searchParams.get(sizeKey));
    return Number.isFinite(raw) && raw > 0 ? raw : defaultPageSize;
  }, [searchParams, sizeKey, defaultPageSize]);

  const setParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // page: gidilecek gerçek (1-indeksli) sayfa numarası — dönüşüm yok
  const setCurrentPage = useCallback(
    (page: number) => {
      setParams({ [pageKey]: page });
    },
    [setParams, pageKey],
  );

  const setPageSize = useCallback(
    (size: number) => {
      setParams({ [sizeKey]: size, [pageKey]: 1 });
    },
    [setParams, pageKey, sizeKey],
  );

  return { currentPage, pageSize, setCurrentPage, setPageSize };
};