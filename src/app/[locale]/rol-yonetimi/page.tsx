import { Topbar } from "@/components/common/Topbar";
import { RolesListBody } from "@/components/roles/RolesListBody";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function RolesPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <RolesListBody />
    </div>
  );
}
