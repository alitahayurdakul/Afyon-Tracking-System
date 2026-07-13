import { Topbar } from "@/components/common/Topbar";
import { ProcessHistoryListBody } from "@/components/processHistory/processHistoryListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ProcessHistoryPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <ProcessHistoryListBody />
    </div>
  );
}
