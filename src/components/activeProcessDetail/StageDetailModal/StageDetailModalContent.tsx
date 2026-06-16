"use client";

import { useState } from "react";
import { SubStage } from "@/types/activeProcessDetailTypes";
import { mockStageDetails } from "@/mock/processData";
import Stepper from "./Stepper";
import DelayReasonGroup from "./DelayReasonGroup";
import MaterialList from "./MaterialList";
import ImageUploader from "./ImageUploader";
import StatusChip from "../StatusChip";
import styles from "./StageDetailModal.module.scss";
import { Modal } from "@/components/common/Modal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { useGetActiveProcessesDataQuery } from "@/api/queries/useGetProcessesQueries";
import { useGetSubStageDetailDataQuery } from "@/api/queries/useGetActiveStageDetailQueries";
import { formatDate } from "@/utils/formDate";

interface StageDetailModalProps {
  id: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function StageDetailModalContent({
  id,
  open,
  setOpen,
}: StageDetailModalProps) {
  const detail = mockStageDetails[id];
  const [subStages, setSubStages] = useState<SubStage[]>(
    detail?.subStages ?? [],
  );
  const [activeIndex, setActiveIndex] = useState(
    subStages.findIndex((s) => s.status === "active") ?? 0,
  );
  const { data, isLoading, isError } = useGetSubStageDetailDataQuery(
    subStages[activeIndex]?.id ?? "",
  );
  console.log(data, "data", subStages);

  if (!detail) return null;

  const current = subStages[activeIndex];
  const isLocked = current.status !== "active";

  const updateCurrent = (changes: Partial<SubStage>) => {
    setSubStages((prev) =>
      prev.map((s, i) => (i === activeIndex ? { ...s, ...changes } : s)),
    );
  };

  const completeStage = () => {
    setSubStages((prev) =>
      prev.map((s, i) => {
        if (i === activeIndex) return { ...s, status: "completed" };
        if (i === activeIndex + 1) return { ...s, status: "active" };
        return s;
      }),
    );
    if (activeIndex < subStages.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Modal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      width="900px"
      height="auto"
      title={`Aşama detayı — ${detail.stageName}`}
      isCloseOutside={false}
      isCloseEsc={false}
      enableParams={true}
      open={open}
      setOpen={setOpen}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>{subStages[activeIndex].name}</span>
            <StatusChip status={current.status} />
          </div>
        </div>

        <Stepper
          subStages={subStages}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <div className={styles.body}>
          <section className={styles.section}>
            <h3>Gecikme nedenleri</h3>
            <DelayReasonGroup
              selected={current.delayReasons}
              disabled={isLocked}
              onChange={(reasons) => updateCurrent({ delayReasons: reasons })}
            />
          </section>
          {current.materials && current.materials.length > 0 && (
            <section className={styles.section}>
              <h3>Malzemeler ve seri numaraları</h3>

              <MaterialList
                materials={current.materials}
                disabled={isLocked}
                onChange={(materials) => updateCurrent({ materials })}
              />
            </section>
          )}

          <section className={styles.section}>
            <h3>Zaman bilgileri</h3>
            <div className={styles.timeRow}>
              <label>
                <b>Başlangıç</b>
              </label>
              <label>
                <b>Bitiş</b>
              </label>
              <label>{formatDate(current.start)}</label>
              <label>{formatDate(current.end)}</label>
            </div>
          </section>

          <section className={styles.section}>
            <h3>Açıklama</h3>
            <textarea
              value={current.description}
              disabled={isLocked}
              className={styles.textarea}
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
    </Modal>
  );
}
