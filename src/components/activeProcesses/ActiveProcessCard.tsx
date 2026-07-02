import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import DE22000 from "@/assets/images/DE-22000.jpg";
import { URL_PAGES } from "@/consts/url";
import styles from "@/styles/components/activeProcesses/ActiveProcessesGrid.module.scss";
import { IProcessType } from "@/types/processTypes";
import { getStageProgress } from "@/utils/activeProcessUtils";

import { DynamicTextWithTooltip } from "../common/DynamicTextWithTooltip";

export const ActiveProcessCard = ({ unit }: { unit: IProcessType }) => {
  const t = useTranslations("activeProcess.card");
  const { percent } = getStageProgress(unit);

  return (
    <Link
      href={`${URL_PAGES.activeProcesses}/${unit._id}`}
      className={`${styles["unit-card"]} ${styles["featured"]}`}
    >
      <div className={styles["unit-image"]}>
        <Image src={DE22000.src} alt={unit.locomotiveNo ?? "DE-22000"} fill />

        {unit.workflowName && (
          <div className={styles["process-badge"]}>{unit.workflowName}</div>
        )}
        <div className={styles["unit-badge"]}>{unit.locomotiveNo}</div>
      </div>

      <div className={styles["unit-body"]}>
        <div className={styles["status-row"]}>
          <span className={styles["status-label"]}>{t("project")}:</span>
          <span className={styles["tag"]}>{unit.projectName ?? "-"}</span>
        </div>
        <div className={styles["status-row"]}>
          <span className={styles["status-label"]}>{t("wagon")}:</span>
          <span className={styles["tag"]}>{unit.wagonNo ?? "-"}</span>
        </div>
        <div className={styles["status-row"]}>
          <span className={styles["status-label"]}>{t("addition-info")}:</span>
          <span className={styles["tag"]}>
            <DynamicTextWithTooltip text={unit.description ?? "-"} textClassName={styles["tag"]} />
          </span>
        </div>

        <div className={styles["status-row"]}>
          <span className={styles["status-label"]}>{t("ongoing-stages")}:</span>
          <span className={styles["tag"]}>{unit.activeStageCount ?? "-"}</span>
        </div>

        {(
          <div className={styles["progress-block"]}>
            <div className={styles["progress-row"]}>
              <span className={styles["progress-label"]}>
                {t.rich("progress", {
                  progress: `${unit.completedStageCount} / ${unit.stageCount}`,
                })}
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
