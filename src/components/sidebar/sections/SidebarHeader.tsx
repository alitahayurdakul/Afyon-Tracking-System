"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import styles from "@/styles/components/sidebar/sections/TopSection.module.scss";

export const SidebarHeader = () => {
  const t = useTranslations("layout");
  return (
    <div className={styles["sidebar-header"]}>
      <div className={styles["icon-container"]}>
        <Image
          src={logo}
          alt="TCDD Logo"
          width={300}
          height={135}
          quality={95}
          priority
        />
      </div>
      <div className={styles["text-container"]}>
        <p className={styles["subtitle"]}>{t("sidebar.headerTitle")}</p>
      </div>
    </div>
  );
};
