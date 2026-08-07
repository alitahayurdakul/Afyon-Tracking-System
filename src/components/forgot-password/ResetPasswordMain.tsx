import { LoginBrand } from "../login/LoginBrand";
import LanguageSelector from "../NewLanguageSelectBox";

import { ResetPasswordCard } from "./ResetPasswordCard";

import styles from "@/styles/components/forgot-password/ForgotPasswordMain.module.scss";

export const ResetPasswordMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles["lang-switch"]}>
        <LanguageSelector />
      </div>

      <div className={styles.container}>
        <LoginBrand />
        <ResetPasswordCard />
      </div>
    </div>
  );
};
