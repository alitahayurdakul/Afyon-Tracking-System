import { Topbar } from "@/components/common/Topbar";
import { WorkflowsListBody } from "@/components/workflows/WorkflowsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function Workflows() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <WorkflowsListBody />
    </div>
  );
}
