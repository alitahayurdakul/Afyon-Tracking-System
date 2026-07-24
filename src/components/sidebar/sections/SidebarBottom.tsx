"use client";

import { useSelector } from "react-redux";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLogoutMutation } from "@/api/queries/useAuthQueries";
import { useRouter } from "@/i18n/routing";
import { RootState } from "@/redux/store";

import styles from "@/styles/components/sidebar/sections/SidebarBottom.module.scss";

export const SidebarBottom = () => {
  const router = useRouter();
  const { mutateAsync: logout } = useLogoutMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const displayName = user?.fullname || user?.email || "-";
  const displayRole = user?.role?.roleName || "-";

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={styles["sidebar-bottom"]}>
      <div className={styles["profile"]}>
        <div className={styles["profile-container"]}>
          <ProfileSvg />
        </div>
        <div className={styles["user-info"]}>
          <span className={styles["name"]}>{displayName}</span>
          <span className={styles["role"]}>{displayRole}</span>
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
