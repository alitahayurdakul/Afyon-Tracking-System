import { LoginBrand } from "./LoginBrand";
import { LoginCard } from "./LoginCard";
import styles from "@/styles/components/login/LoginMain.module.scss";

export const LoginMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles["blob-primary"]} />
        <div className={styles["blob-secondary"]} />
        <div className={styles.dots} />
      </div>

      <div className={styles.container}>
        <LoginBrand />
        <LoginCard />
      </div>
    </div>
  );
};
