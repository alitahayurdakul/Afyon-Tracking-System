"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/components/LanguageSelector.module.scss";
import { ILanguageItemType } from "@/types/layoutTypes";
import { LANGUAGES } from "@/consts/languageConsts";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { ILanguagesTypes } from "@/types/generalTypes";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ILanguageItemType>(
    () =>
      LANGUAGES.find((l: ILanguageItemType) => l.code === locale) ??
      LANGUAGES[0],
  );

  const onSwitchLang = (lang: ILanguagesTypes) => {
    if (locale !== lang) {
      const { locale: _ignored, ...rest } = params ?? {};
      const query: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        query[key] = value;
      });
      router.replace(
        { pathname: pathname as any, params: rest as any, query } as any,
        { locale: lang, scroll: false },
      );
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
      <div
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.flag}>{selected.flag}</span>
        <span className={styles.label}>{selected.name}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {LANGUAGES.map((lang: ILanguageItemType) => (
            <div
              key={lang.code}
              className={`${styles.option} ${selected.code === lang.code ? styles.active : ""}`}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
                onSwitchLang(lang.code);
              }}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
              {selected.code === lang.code && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.check}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
