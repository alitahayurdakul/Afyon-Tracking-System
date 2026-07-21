import { Topbar } from "@/components/common/Topbar";
import { ProcessTrainsContainer } from "@/components/processTrains/ProcessTrainsContainer";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function TrainProcessesPage() {
    return(
        <div className={styles["page-container"]} >
            <Topbar />
            <ProcessTrainsContainer />
        </div>
    )
}