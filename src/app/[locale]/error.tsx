"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { URL_PAGES } from "@/consts/url";
import { Link } from "@/i18n/routing";

import styles from "@/styles/pages/StatusPage.module.scss";

/**
 * Segment error boundary. Catches render/effect errors thrown anywhere below
 * the locale layout, so a single broken component no longer blanks the app.
 * Errors thrown by the layout itself are caught by app/global-error.tsx.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("layout.errorPage");

  useEffect(() => {
    // The user-facing copy stays generic; the real error goes to the console
    // (and to the server log for a server-side render).
    console.error("[ui] render failed", error);
  }, [error]);

  return (
    <section className={styles["status-page"]}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>

      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={reset}>
          {t("retry")}
        </button>
        <Link
          href={URL_PAGES.activeProcesses}
          className={`${styles.button} ${styles["button-secondary"]}`}
        >
          {t("home")}
        </Link>
      </div>

      {error.digest && <p className={styles.digest}>#{error.digest}</p>}
    </section>
  );
}
