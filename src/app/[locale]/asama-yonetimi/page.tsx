import { Topbar } from "@/components/common/Topbar";
import { StagesListBody } from "@/components/stages/StagesListBody";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function StagesPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <StagesListBody />
    </div>
  );
}
