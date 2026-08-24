"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { LANGUAGES } from "@/consts/languageConsts";
import { usePathname, useRouter } from "@/i18n/routing";
import { ILanguagesTypes } from "@/types/generalTypes";
import { ILanguageItemType } from "@/types/layoutTypes";

import styles from "@/styles/components/LanguageSelector.module.scss";

/**
 * Language switcher.
 *
 * Trigger and options are real <button>s using the menu/menuitem pattern:
 * they were plain <div onClick>s, which meant Tab never reached them and the
 * language could not be changed without a mouse. Focus moves between items
 * with the arrow keys, Escape closes and returns focus to the trigger.
 */
export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations("layout.languageSelector");
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // The menu is only in the DOM while open, so focus has to wait a frame.
  const openMenu = (focusIndex: number) => {
    setOpen(true);
    requestAnimationFrame(() => optionRefs.current[focusIndex]?.focus());
  };

  const closeMenu = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openMenu(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(LANGUAGES.length - 1);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      closeMenu();
    }
  };

  const onOptionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const son = LANGUAGES.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[index === son ? 0 : index + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      optionRefs.current[index === 0 ? son : index - 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      optionRefs.current[son]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "Tab") {
      // Let focus leave naturally, but don't leave an orphaned menu open.
      setOpen(false);
    }
  };

  const onSelect = (lang: ILanguageItemType) => {
    setSelected(lang);
    closeMenu();
    onSwitchLang(lang.code);
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label", { language: selected.name })}
        onKeyDown={onTriggerKeyDown}
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.flag}>{selected.flag}</span>
        <span className={styles.label}>{selected.name}</span>
        <svg
          aria-hidden="true"
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
      </button>

      {open && (
        <div role="menu" aria-label={t("menuLabel")} className={styles.dropdown}>
          {LANGUAGES.map((lang: ILanguageItemType, index: number) => (
            <button
              key={lang.code}
              type="button"
              role="menuitem"
              aria-current={selected.code === lang.code}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onKeyDown={(e) => onOptionKeyDown(e, index)}
              className={`${styles.option} ${selected.code === lang.code ? styles.active : ""}`}
              onClick={() => onSelect(lang)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
              {selected.code === lang.code && (
                <svg
                  aria-hidden="true"
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
