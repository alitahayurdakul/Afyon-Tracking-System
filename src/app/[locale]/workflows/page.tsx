import Breadcrumb from "@/components/Breadcrumb";
import { Topbar } from "@/components/common/Topbar";
import { WorkflowsListBody } from "@/components/workflows/WorkflowsListBody";
import styles from "@/styles/pages/StagesPage.module.scss";

export default function Workflows() {
  return (
    <div className={styles["stages-container"]}>
      <Topbar />
      <Breadcrumb data={[{ name: "İş Akışları" }]} />
      <WorkflowsListBody />
    </div>
  );
}
