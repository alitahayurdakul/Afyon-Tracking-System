"use client";

import { useState } from "react";
import { MainStage, SubStage } from "@/types/process";
import { mockStageDetails } from "@/mock/processData";
import Stepper from "./Stepper";
import DelayReasonGroup from "./DelayReasonGroup";
import MaterialList from "./MaterialList";
import ImageUploader from "./ImageUploader";
import StatusChip from "../StatusChip";
import styles from "./StageDetailModal.module.scss";

interface StageDetailModalProps {
  stage: MainStage;
  onClose: () => void;
}

export default function StageDetailModal({ stage, onClose }: StageDetailModalProps) {
  const detail = mockStageDetails[stage.id];
  const [subStages, setSubStages] = useState<SubStage[]>(detail?.subStages ?? []);
  const [activeIndex, setActiveIndex] = useState(
    subStages.findIndex((s) => s.status === "active") ?? 0
  );

  if (!detail) return null;

  const current = subStages[activeIndex];
  const isLocked = current.status !== "active";

  const updateCurrent = (changes: Partial<SubStage>) => {
    setSubStages((prev) =>
      prev.map((s, i) => (i === activeIndex ? { ...s, ...changes } : s))
    );
  };

  const completeStage = () => {
    setSubStages((prev) =>
      prev.map((s, i) => {
        if (i === activeIndex) return { ...s, status: "completed" };
        if (i === activeIndex + 1) return { ...s, status: "active" };
        return s;
      })
    );
    if (activeIndex < subStages.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>Aşama detayı — {detail.stageName}</span>
            <StatusChip status={current.status} />
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <Stepper subStages={subStages} activeIndex={activeIndex} onSelect={setActiveIndex} />

        <div className={styles.body}>
          <section className={styles.section}>
            <h3>Gecikme nedenleri</h3>
            <DelayReasonGroup
              selected={current.delayReasons}
              disabled={isLocked}
              onChange={(reasons) => updateCurrent({ delayReasons: reasons })}
            />
          </section>

          <section className={styles.section}>
            <h3>Malzemeler ve seri numaraları</h3>
            <MaterialList
              materials={current.materials}
              disabled={isLocked}
              onChange={(materials) => updateCurrent({ materials })}
            />
          </section>

          <section className={styles.section}>
            <h3>Zaman bilgileri</h3>
            <div className={styles.timeRow}>
              <label>
                Başlangıç
                <input
                  type="datetime-local"
                  value={current.start ?? ""}
                  disabled={isLocked}
                  onChange={(e) => updateCurrent({ start: e.target.value })}
                />
              </label>
              <label>
                Bitiş
                <input
                  type="datetime-local"
                  value={current.end ?? ""}
                  disabled={isLocked}
                  onChange={(e) => updateCurrent({ end: e.target.value })}
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <h3>Açıklama</h3>
            <textarea
              value={current.description}
              disabled={isLocked}
              placeholder="Açıklama giriniz..."
              onChange={(e) => updateCurrent({ description: e.target.value })}
            />
          </section>

          <section className={styles.section}>
            <h3>Görseller</h3>
            <ImageUploader
              images={current.images}
              disabled={isLocked}
              onChange={(images) => updateCurrent({ images })}
            />
          </section>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.completeBtn}
            disabled={current.status !== "active"}
            onClick={completeStage}
          >
            Aşamayı tamamla
          </button>
        </div>
      </div>
    </div>
  );
}
