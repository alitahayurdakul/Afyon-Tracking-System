import { ActiveProcessesHeader } from "@/components/activeProcesses/ActiveProcessesHeader";
import { ActiveProcessGrid } from "@/components/activeProcesses/ActiveProcessGrid";
import Breadcrumb from "@/components/Breadcrumb";
import { Topbar } from "@/components/common/Topbar";
// import { HomeActiveProcessGrid } from "@/components/homeActiveProcesses/body/HomeActiveProcessGrid";
import styles from "@/styles/pages/HomeActiveProcesses.module.scss";

export default function ActiveProcessPage() {
  return (
    <div className={styles["home-active-processes-page"]}>
      <Topbar showCreateButton={true}/>
      <Breadcrumb data={[
        { name: "Depo Gösterge Paneli" }
      ]}/>
       <ActiveProcessesHeader />
      <ActiveProcessGrid />
    </div>
  );
}
