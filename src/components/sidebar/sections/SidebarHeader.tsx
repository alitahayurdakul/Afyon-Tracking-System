import styles from "@/styles/components/sidebar/sections/TopSection.module.scss";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export const SidebarHeader = () => {
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
        <p className={styles["subtitle"]}>AFYON İŞ AKIŞI YÖNETİM SİSTEMİ</p>
      </div>
    </div>
  );
};
