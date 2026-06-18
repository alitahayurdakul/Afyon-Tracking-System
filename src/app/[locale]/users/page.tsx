import { Topbar } from "@/components/common/Topbar";
import { UsersListBody } from "@/components/users/UsersListBody";
import styles from "@/styles/pages/UsersPage.module.scss";

export default function UsersPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <UsersListBody />
    </div>
  );
}
