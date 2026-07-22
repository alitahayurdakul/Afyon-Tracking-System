import { Topbar } from "@/components/common/Topbar";
import { ProcessTrainDetailContainer } from "@/components/processTrainDetail/ProcessTrainDetailContainer";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function TrainProcessDetailPage() {
    return(
        <div className={styles["page-container"]} >
            <Topbar />
            <ProcessTrainDetailContainer />
        </div>
    )
}