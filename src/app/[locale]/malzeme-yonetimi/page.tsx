import { Topbar } from "@/components/common/Topbar";
import { MaterialsListBody } from "@/components/materials/MaterialsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function MaterialsPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <MaterialsListBody />
    </div>
  );
}
