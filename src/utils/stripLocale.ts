import { routing } from "@/i18n/routing";

/**
 * `[locale]` yönlendirmesi nedeniyle `usePathname()` locale önekli yol
 * döndürebilir (ör. "/en/reasons"). Bu yardımcı, baştaki locale segmentini
 * kaldırarak sidebar gibi yerlerde aktif sekme karşılaştırmasının doğru
 * çalışmasını sağlar.
 */
export const stripLocale = (pathname: string | null): string => {
  if (!pathname) return "/";

  const segments = pathname.split("/");
  // segments[0] boş ("/..." ile başladığı için), segments[1] ilk segment.
  if (
    segments.length > 1 &&
    (routing.locales as readonly string[]).includes(segments[1])
  ) {
    const stripped = "/" + segments.slice(2).join("/");
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }

  return pathname;
};
