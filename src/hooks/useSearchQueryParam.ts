"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
      window.history.replaceState(
        null,
        "",
        query ? `${pathname}?${query}` : pathname,
      );
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, debounceMs, pageKey, paramKey, pathname, searchParams]);

  const clearSearch = useCallback(() => setInputValue(""), []);

  return {
    search: urlValue,
    inputValue,
    setInputValue,
    clearSearch,
    isPending: inputValue.trim() !== urlValue,
  };
};
