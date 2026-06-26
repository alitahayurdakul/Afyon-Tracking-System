import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { STATUS } from "@/consts/options";
import { MainStage } from "@/types/activeProcessDetailTypes";
import { IStatusType } from "@/types/commonTypes";
import { getStatus } from "@/utils/getStatus";

import styles from "./ProcessFlow.module.scss";
import StageDetailModal from "./stageDetail/StageDetailModal";
import StatusChip from "./StatusChip";

interface StageRowProps {
  stage: MainStage;
  index: number;
  isLast: boolean;
  onOpenDetail: (stage: MainStage) => void;
}

export default function StageRow({
  stage,
  index,
  isLast,
  onOpenDetail,
}: StageRowProps) {

  const nodeLabel =
    getStatus(stage.status) === "completed"
      ? "✓"
      : index + 1;
  const t = useTranslations("activeProcessDetail");

  return (
    <div className={styles.row}>
      {!isLast && (
        <div
          className={`${styles.connector} ${styles[getStatus(stage.status)]}`}
        />
      )}

      <div
        className={`${styles.node} ${styles[getStatus(stage.status)]}`}
      >
        {nodeLabel}
      </div>

      <div
        className={`${styles.card} ${styles[getStatus(stage.status)]}`}
        onClick={() => onOpenDetail(stage)}
      >
        <div className={styles.cardLeft}>
          <span className={styles.cardName}>
            {stage.name}
            {getStatus(stage.status) && stage.elapsed && (
              <span className={styles.durationChip}>{stage.elapsed}</span>
            )}
          </span>

          <div className={styles.cardMeta}>
            {getStatus(stage.status) === "completed" && (
              <>
                <span>
                  {t("start-date")}: {stage.start}
                </span>
                <span>
                  {t("end-date")}: {stage.end}
                </span>
              </>
            )}
            {getStatus(stage.status) === "active" && (
              <>
                <span>
                  {t("start-date")} {stage.start}
                </span>
                <span>{t("pending")}</span>
              </>
            )}
            {getStatus(stage.status) === "pending" && (
              <span>{t("not-yet-started")}</span>
            )}
          </div>
        </div>

        <div className={styles.cardRight}>
          <StatusChip status={stage.status as string} t={t}/>
          <StageDetailModal id={stage.id} />
        </div>
      </div>
    </div>
  );
}
