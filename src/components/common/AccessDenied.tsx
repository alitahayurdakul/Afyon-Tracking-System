"use client";

import { useTranslations } from "next-intl";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/components/common/AccessDenied.module.scss";

export const AccessDenied = () => {
  const t = useTranslations("layout.accessDenied");

  return (
    <div className={styles["access-denied"]}>
      <FontAwesomeIcon icon={faLock} className={styles["icon"]} />
      <p className={styles["title"]}>{t("title")}</p>
      <p className={styles["description"]}>{t("description")}</p>
    </div>
  );
};
