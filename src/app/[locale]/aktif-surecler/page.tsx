import { ActiveProcessesHeader } from "@/components/activeProcesses/ActiveProcessesHeader";
import { ActiveProcessGrid } from "@/components/activeProcesses/ActiveProcessGrid";
import { Topbar } from "@/components/common/Topbar";
// import { HomeActiveProcessGrid } from "@/components/homeActiveProcesses/body/HomeActiveProcessGrid";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ActiveProcessPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar showCreateButton={true}/>
       <ActiveProcessesHeader />
      <ActiveProcessGrid />
    </div>
  );
}
