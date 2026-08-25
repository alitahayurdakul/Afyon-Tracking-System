import { Topbar } from "@/components/common/Topbar";
import { LogsListBody } from "@/components/logs/LogsListBody";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function LogsPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <LogsListBody />
    </div>
  );
}
