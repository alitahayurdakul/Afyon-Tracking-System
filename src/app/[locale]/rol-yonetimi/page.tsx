import { Topbar } from "@/components/common/Topbar";
import { RolesListBody } from "@/components/roles/RolesListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function RolesPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <RolesListBody />
    </div>
  );
}
