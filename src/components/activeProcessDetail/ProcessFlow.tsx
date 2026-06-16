"use client";

import { useState } from "react";
import { MainStage } from "@/types/activeProcessDetailTypes";
import { mockMainStages } from "@/mock/processData";
import StageRow from "./StageRow";
import styles from "./ProcessFlow.module.scss";

export default function ProcessFlow() {
  const [stages] = useState<MainStage[]>(mockMainStages);
  const [selectedStage, setSelectedStage] = useState<MainStage | null>(null);

  const completedCount = stages.filter((s) => s.status === "completed").length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Süreç Akışı</span>
        <div className={styles.progress}>
          <span className={styles.progressText}>
            {completedCount} / {stages.length} tamamlandı
          </span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.completed}`} />
          Tamamlandı
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.active}`} />
          Aktif
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.pending}`} />
          Bekliyor
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
