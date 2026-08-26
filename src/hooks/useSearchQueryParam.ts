"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseSearchQueryParamOptions {
  paramKey?: string;
  pageKey?: string;
  debounceMs?: number;
}

export const useSearchQueryParam = ({
  paramKey = "search",
  pageKey = "page",
  debounceMs = 400,
}: UseSearchQueryParamOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get(paramKey)?.trim() ?? "";
  const [inputValue, setInputValue] = useState(urlValue);
  const syncedValue = useRef(urlValue);

  useEffect(() => {
    if (urlValue !== syncedValue.current) {
      syncedValue.current = urlValue;
      setInputValue(urlValue);
    }
  }, [urlValue]);

  useEffect(() => {
    const nextValue = inputValue.trim();
    if (nextValue === syncedValue.current) return;

    const timer = setTimeout(() => {
      syncedValue.current = nextValue;

      const params = new URLSearchParams(searchParams.toString());
      if (nextValue) {
        params.set(paramKey, nextValue);
      } else {
        params.delete(paramKey);
      }
      params.delete(pageKey);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    debounceMs,
    pageKey,
    paramKey,
    pathname,
    router,
    searchParams,
  ]);

  const clearSearch = useCallback(() => setInputValue(""), []);

  return {
    search: urlValue,
    inputValue,
    setInputValue,
    clearSearch,
    isPending: inputValue.trim() !== urlValue,
  };
};
