import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { URL_PAGES } from "@/consts/url";
import { routing } from "@/i18n/routing";
import { ILanguagesTypes } from "@/types/generalTypes";

import styles from "@/styles/pages/StatusPage.module.scss";

/**
 * Root 404. An unmatched URL never enters the [locale] segment, so this file —
 * not app/[locale]/not-found.tsx — is what Next renders, and it sits above
 * NextIntlClientProvider. Adding a catch-all route inside [locale] would make
 * the locale available but turns the response into a soft 404 (HTTP 200,
 * because the route then matches), so the locale is resolved here instead from
 * the NEXT_LOCALE cookie that the proxy sets.
 */
export default async function NotFound() {
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale = routing.locales.includes(cookieLocale as ILanguagesTypes)
    ? (cookieLocale as ILanguagesTypes)
    : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "layout.notFoundPage" });
  const home =
    locale === routing.defaultLocale
      ? URL_PAGES.activeProcesses
      : `/${locale}${URL_PAGES.activeProcesses}`;

  return (
    <section className={styles["status-page"]}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>

      <div className={styles.actions}>
        <a href={home} className={styles.button}>
          {t("home")}
        </a>
      </div>
    </section>
  );
}
