import Image from "next/image";

import logo from "@/assets/images/logo.png";
import styles from "@/styles/components/common/AuthBrand.module.scss";

export const LoginBrand = () => {
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
      <h1 className={styles.title}>Afyon İş Akışı Yönetim Sistemi</h1>
    </div>
  );
};
