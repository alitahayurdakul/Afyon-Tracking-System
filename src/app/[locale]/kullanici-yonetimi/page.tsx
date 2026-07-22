import { Topbar } from "@/components/common/Topbar";
import { UsersListBody } from "@/components/users/UsersListBody";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function UsersPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <UsersListBody />
    </div>
  );
}
