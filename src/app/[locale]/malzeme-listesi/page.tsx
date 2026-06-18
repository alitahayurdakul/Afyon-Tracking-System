import { Topbar } from "@/components/common/Topbar";
import { MaterialsListBody } from "@/components/materials/MaterialsListBody";
import styles from "@/styles/pages/MaterialsPage.module.scss";

export default function MaterialsPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <MaterialsListBody />
    </div>
  );
}
