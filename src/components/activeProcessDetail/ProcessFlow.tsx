"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { mockMainStages } from "@/mock/processData";
import { MainStage } from "@/types/activeProcessDetailTypes";
import { getStatus } from "@/utils/getStatus";

import styles from "./ProcessFlow.module.scss";
import StageRow from "./StageRow";

export default function ProcessFlow() {
  const [stages] = useState<MainStage[]>(mockMainStages);
  const [selectedStage, setSelectedStage] = useState<MainStage | null>(null);
  const t = useTranslations("activeProcessDetail");

  const completedCount = stages.filter((s) => getStatus(s.status) === "completed").length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>{t("process-flow")}</span>
        <div className={styles.progress}>
          <span className={styles.progressText}>
            {t.rich("progress-process", {
              progress: `${completedCount} / ${stages.length}`,
            })}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.completed}`} />
          {t("status.completed")}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.active}`} />
          {t("status.active")}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.pending}`} />
          {t("status.pending")}
        </span>
      </div>

      <div className={styles.track}>
        {stages.map((stage, index) => (
          <StageRow
            key={stage.id}
            stage={stage}
            index={index}
            isLast={index === stages.length - 1}
            onOpenDetail={setSelectedStage}
          />
        ))}
      </div>
    </div>
  );
}
