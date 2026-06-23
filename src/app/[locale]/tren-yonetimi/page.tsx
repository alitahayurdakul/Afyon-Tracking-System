import Breadcrumb from "@/components/Breadcrumb";
import { Topbar } from "@/components/common/Topbar";
import { TrainsListBody } from "@/components/trains/TrainsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function TrainsPage() {
    return(
        <div className={styles["page-container"]} >
            <Topbar />
            <Breadcrumb data={[{ name: "Trains" }]} />
            <TrainsListBody />
        </div>
    )
}