import { ActiveProcessesWrapper } from "@/components/activeProcesses/ActiveProcessesWrapper";
import { Topbar } from "@/components/common/Topbar";

// import { HomeActiveProcessGrid } from "@/components/homeActiveProcesses/body/HomeActiveProcessGrid";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ActiveProcessPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar showCreateButton={true} />
      <ActiveProcessesWrapper />
    </div>
  );
}
