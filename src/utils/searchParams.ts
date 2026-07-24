"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useRemoveQueryParamModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (name?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name ?? "modal");

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams],
  );
};

export const useAddQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (willAddKey: string, willQueryValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(willAddKey, willQueryValue);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );
};
