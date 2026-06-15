"use client";

import styles from "@/styles/components/sidebar/sections/SidebarBottom.module.scss";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const SidebarBottom = () => {
  const router = useRouter();

  const onLogout = () => {
    router.push("/login");
  };

  return (
    <div className={styles["sidebar-bottom"]}>
      <div className={styles["profile"]}>
        <div className={styles["profile-container"]}>
          <ProfileSvg />
        </div>
        <div className={styles["user-info"]}>
          <span className={styles["name"]}>Ali Taha Yurdakul</span>
          <span className={styles["role"]}>Sistem Yöneticisi</span>
        </div>
      </div>

      <button
        type="button"
        className={styles["logout-btn"]}
        onClick={onLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Çıkış Yap</span>
      </button>
    </div>
  );
};

const ProfileSvg = () => {
  return (
    <svg className={styles["profile-icon"]} viewBox="0 -960 960 960">
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  );
};
