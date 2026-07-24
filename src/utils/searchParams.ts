"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Modal görünürlüğü tamamen URL'deki ?modal= param'ına bağlı olduğu için, kapatma
// da URL'i güvenilir şekilde güncellemeli. router.replace kullanınca Next.js App
// Router'ın client cache'i ikinci kez aynı temiz URL'e gidildiğinde rotayı
// cache'ten servis edip useSearchParams'ı yeniden okutmuyordu → ilk modal kapanıp
// sonrakiler kapanmıyordu (özellikle Vercel prod build'inde).
//
// window.history.replaceState, Next tarafından enstrümante edilir: RSC navigasyon
// ve cache makinesini atlar, URL'i doğrudan günceller; useSearchParams/usePathname
// her seferinde yeniden okur. Bu yüzden query-only değişikliklerde bunu kullanıyoruz.
export const useRemoveQueryParamModal = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (name?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name ?? "modal");

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      window.history.replaceState(null, "", url);
    },
    [pathname, searchParams],
  );
};

export const useAddQueryParam = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (willAddKey: string, willQueryValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(willAddKey, willQueryValue);

      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    },
    [pathname, searchParams],
  );
};
