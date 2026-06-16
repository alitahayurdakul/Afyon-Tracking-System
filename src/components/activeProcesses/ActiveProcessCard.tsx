import styles from "@/styles/components/activeProcesses/ActiveProcessesGrid.module.scss";
import DE22000 from "@/assets/images/DE-22000.jpg";
import Image from "next/image";
import Link from "next/link";
import { IActiveProcessType } from "@/types/processTypes";
import { getStageProgress } from "@/utils/activeProcessUtils";
import { URL_PAGES } from "@/consts/url";

export const ActiveProcessCard = ({ unit }: { unit: IActiveProcessType }) => {

  const { hasProgress, currentStep, total, percent } = getStageProgress(unit);
  const stageName = unit.openStage?.stageName ?? null;

  return (
    <Link
      href={`${URL_PAGES.activeProcesses}/${unit._id}`}
      className={`${styles["unit-card"]} ${styles["featured"]}`}
    >
      <div className={styles["unit-image"]}>
        <Image src={DE22000.src} alt={unit.locomotiveNo ?? "DE-22000"} fill />

        {unit.workflowName && (
          <div className={styles["process-badge"]}>
            {unit.workflowName}
          </div>
        )}
        <div className={styles["unit-badge"]}>{unit.locomotiveNo}</div>
      </div>

      <div className={styles["unit-body"]}>
        <div className={styles["status-row"]}>
            <span className={styles["status-label"]}>Vagon:</span>
            <span className={styles["tag"]}>1.Vagon</span>
          </div>
           <div className={styles["status-row"]}>
            <span className={styles["status-label"]}>Ek Bilgi:</span>
            <span className={styles["tag"]}>123AE213</span>
          </div>
        {stageName && (
          <div className={styles["status-row"]}>
            <span className={styles["status-label"]}>Durum:</span>
            <span className={styles["status-tag"]}>{stageName}</span>
          </div>
        )}

         <div className={styles["status-row"]}>
            <span className={styles["status-label"]}>Devam Eden Aşamalar:</span>
            <span className={styles["tag"]}>3</span>
          </div>

        {hasProgress && (
          <div className={styles["progress-block"]}>
            <div className={styles["progress-row"]}>
              <span className={styles["progress-label"]}>
                AŞAMA {currentStep}/{total}
              </span>
              <span className={styles["progress-pct"]}>%{percent}</span>
            </div>
            <div className={styles["progress-bar"]}>
              <div
                className={styles["progress-fill"]}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

      </div>
    </Link>
  );
};
