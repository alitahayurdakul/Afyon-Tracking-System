import { MainStage } from "@/types/activeProcessDetailTypes";
import StatusChip from "./StatusChip";
import styles from "./ProcessFlow.module.scss";

interface StageRowProps {
  stage: MainStage;
  index: number;
  isLast: boolean;
  onOpenDetail: (stage: MainStage) => void;
}

export default function StageRow({ stage, index, isLast, onOpenDetail }: StageRowProps) {
  const nodeLabel = stage.status === "completed" ? "✓" : index + 1;

  return (
    <div className={styles.row}>
      {!isLast && <div className={`${styles.connector} ${styles[stage.status]}`} />}

      <div className={`${styles.node} ${styles[stage.status]}`}>{nodeLabel}</div>

      <div
        className={`${styles.card} ${styles[stage.status]}`}
        onClick={() => onOpenDetail(stage)}
      >
        <div className={styles.cardLeft}>
          <span className={styles.cardName}>
            {stage.name}
            {stage.status === "completed" && stage.elapsed && (
              <span className={styles.durationChip}>{stage.elapsed}</span>
            )}
          </span>

          <div className={styles.cardMeta}>
            {stage.status === "completed" && (
              <>
                <span>Başlangıç: {stage.start}</span>
                <span>Bitiş: {stage.end}</span>
              </>
            )}
            {stage.status === "active" && (
              <>
                <span>Başlangıç: {stage.start}</span>
                <span>Sürüyor</span>
              </>
            )}
            {stage.status === "pending" && <span>Henüz başlamadı</span>}
          </div>
        </div>

        <div className={styles.cardRight}>
          <StatusChip status={stage.status} />
          <button
            className={styles.detailBtn}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(stage);
            }}
          >
            Detayı aç
          </button>
        </div>
      </div>
    </div>
  );
}
