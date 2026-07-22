import Image from "next/image";
import { useTranslations } from "next-intl";

import logo from "@/assets/images/logo.png";

import styles from "@/styles/components/common/AuthBrand.module.scss";

export const LoginBrand = () => {
  const t = useTranslations("layout.login");

  return (
    <div className={styles.brand}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="TCDD Logo"
          width={160}
          height={72}
          quality={95}
          priority
        />
      </div>
      <h1 className={styles.title}>{t("brandTitle")}</h1>
    </div>
  );
};
