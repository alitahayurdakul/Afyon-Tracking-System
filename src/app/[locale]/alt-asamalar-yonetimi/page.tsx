import { Topbar } from "@/components/common/Topbar";
import { SubStagesListBody } from "@/components/subStages/SubStagesListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function SubStagesPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <SubStagesListBody />
    </div>
  );
}
