"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { IProcessEntry, IStage, ProcessResponse } from "@/types/processTypes";
import { getStageProgress } from "@/utils/activeProcessUtils";
import { StatusEnums } from "@/utils/enum/commonEnums";
import { getStatus } from "@/utils/getStatus";

import StageRow from "./StageRow";

import styles from "@/styles/components/activeProcessDetail/ProcessFlow.module.scss";

export default function ProcessFlow({ data }: { data?: ProcessResponse }) {
  const [selectedStage, setSelectedStage] = useState<IStage | null>(null);
  const t = useTranslations("activeProcessDetail");

  const { percent } = getStageProgress(
    data?.summary.totalStages,
    data?.summary.completedStageCount,
  );

  const slicesStages = data?.stages.slice(0, -1);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>{t("process-flow")}</span>
        <div className={styles.progress}>
          <span className={styles.progressText}>
            {t.rich("progress-process", {
              progress: `${data?.summary.completedStageCount} / ${data?.summary.totalStages}`,
            })}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
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
        {data?.stages.map((stage: IStage, index: number) => (
          <React.Fragment key={stage._id}>
            <StageRow
              key={stage._id}
              stage={stage}
              index={index}
              isLast={index === data?.stages.length - 1}
              onOpenDetail={setSelectedStage}
              entryForStage={data?.entries.find(
                (entry: IProcessEntry) => entry.stageId._id === stage._id,
              )}
              entriesEqStages={slicesStages?.every(
                (stage: IStage) =>
                  getStatus(stage.status) === StatusEnums.completed,
              )}
              stages={slicesStages ?? []}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
