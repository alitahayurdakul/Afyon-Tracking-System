"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseSearchQueryParamOptions {
  /** URL'de kullanılacak parametre adı. */
  paramKey?: string;
  /** Arama değişince sıfırlanacak sayfa parametresi (usePaginationParams ile aynı). */
  pageKey?: string;
  /** Yazma bittikten sonra URL'in güncellenmesi için beklenen süre (ms). */
  debounceMs?: number;
}

/**
 * URL'e yazılan serbest metin araması.
 *
 * Kaynak her zaman URL'dir: `inputValue` yalnızca kullanıcının o an yazdığı
 * metni tutar, `search` ise sorguya gidecek olan (debounce'lanmış) değerdir.
 * Böylece arama sonucu paylaşılabilir/yer imlenebilir olur ve geri-ileri
 * tuşları beklendiği gibi çalışır.
 *
 * Arama değiştiğinde sayfa parametresi silinir; aksi halde 3. sayfadayken
 * yapılan arama boş bir sonuç sayfası gösterirdi.
 */
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

  /**
   * URL'e en son yazdığımız değer. Hem debounce döngüsünün kendi yazdığı
   * değişikliği tekrar işlemesini, hem de dışarıdan gelen URL değişikliğinin
   * (geri/ileri, paylaşılan link) input ile karışmasını engeller.
   */
  const syncedValue = useRef(urlValue);

  // URL dışarıdan değiştiyse input'u ona eşitle.
  useEffect(() => {
    if (urlValue !== syncedValue.current) {
      syncedValue.current = urlValue;
      setInputValue(urlValue);
    }
  }, [urlValue]);

  // Kullanıcı yazmayı bıraktığında URL'i güncelle.
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
    /** Sorguya gönderilecek, URL'deki güncel arama terimi. */
    search: urlValue,
    /** Input'a bağlanacak anlık değer. */
    inputValue,
    setInputValue,
    clearSearch,
    /** Debounce süresi dolmadıysa true — "aranıyor" göstergesi için. */
    isPending: inputValue.trim() !== urlValue,
  };
};
