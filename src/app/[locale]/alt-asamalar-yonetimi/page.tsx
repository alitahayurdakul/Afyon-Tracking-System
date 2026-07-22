import { Topbar } from "@/components/common/Topbar";
import { SubStagesListBody } from "@/components/subStages/SubStagesListBody";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function SubStagesPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <SubStagesListBody />
    </div>
  );
}
