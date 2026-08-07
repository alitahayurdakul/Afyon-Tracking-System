import { LoginBrand } from "../login/LoginBrand";
import LanguageSelector from "../NewLanguageSelectBox";

import { ForgotPasswordCard } from "./ForgotPasswordCard";

import styles from "@/styles/components/forgot-password/ForgotPasswordMain.module.scss";

export const ForgotPasswordMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles["lang-switch"]}>
        <LanguageSelector />
      </div>

      <div className={styles.container}>
        <LoginBrand />
        <ForgotPasswordCard />
      </div>
    </div>
  );
};
