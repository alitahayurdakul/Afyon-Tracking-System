import { useTranslations } from "next-intl";

import { URL_PAGES } from "@/consts/url";
import { Link } from "@/i18n/routing";

import styles from "@/styles/pages/StatusPage.module.scss";

export default function LocaleNotFound() {
  const t = useTranslations("layout.notFoundPage");

  return (
    <section className={styles["status-page"]}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>

      <div className={styles.actions}>
        <Link href={URL_PAGES.activeProcesses} className={styles.button}>
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
