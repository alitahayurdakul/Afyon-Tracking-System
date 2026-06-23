"use client";

import { useState } from "react";

import { useGetSubStagesDataQuery } from "@/api/queries/useGetSubStagesQueries";
import { Modal } from "@/components/common/Modal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { StageDetail, SubStage } from "@/types/activeProcessDetailTypes";
import { IOptionType } from "@/types/formTypes";

import StatusChip from "../StatusChip";
import DelayReasonGroup from "./DelayReasonGroup";
import ImageUploader from "./ImageUploader";
import MaterialList from "./MaterialList";
import TimeSection from "./sections/TimeSection";
import styles from "./StageDetailModal.module.scss";
import Stepper from "./Stepper";

interface StageDetailModalProps {
  id: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

interface NewSubStageData {
  selectedList: IOptionType["value"][];
  materialList: never[]; // or whatever this should actually be
}

export default function StageDetailModalContent({
  id,
  open,
  setOpen,
}: StageDetailModalProps) {
  const {
    data: stageDetail,
    isLoading,
    isError,
  } = useGetSubStagesDataQuery<StageDetail>("");

  const subStagesData = stageDetail?.subStages;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevSubStagesData, setPrevSubStagesData] = useState(subStagesData);

  if (subStagesData !== prevSubStagesData) {
    setPrevSubStagesData(subStagesData);
    const index = subStagesData?.findIndex(
      (s: SubStage) => s.status === "active",
    );
    if (index !== undefined && index !== -1) {
      setActiveIndex(index);
    }
  }

  const activeSubStageData = subStagesData?.[activeIndex];

  const [newSubStageData, setNewSubStageData] = useState<NewSubStageData>({
    selectedList:
      activeSubStageData?.delayReasons?.map((reason) => reason.id) || [],
    materialList: [],
  });
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    setNewSubStageData({
      selectedList:
        activeSubStageData?.delayReasons?.map((reason) => reason.id) || [],
      materialList: [],
    });
  }

  if (!activeSubStageData) return null;

  const isLocked = activeSubStageData.status !== "active";

  const completeStage = () => {
    if (activeIndex < subStagesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Modal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      width="900px"
      height="auto"
      title={`Aşama detayı — ${activeSubStageData?.name || ""}`}
      isCloseOutside={false}
      isCloseEsc={false}
      enableParams={true}
      open={open}
      setOpen={setOpen}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>{activeSubStageData.name}</span>
            <StatusChip status={activeSubStageData.status} />
          </div>
        </div>

        <Stepper
          subStages={subStagesData ?? []}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <div className={styles.body}>
          <TimeSection
            endDate={activeSubStageData.end}
            startDate={activeSubStageData.start}
          />
          <section className={styles.section}>
            <h3>Gecikme nedenleri</h3>
            <DelayReasonGroup
              selectedList={newSubStageData.selectedList}
              disabled={isLocked}
              onChange={(selectedList) =>
                setNewSubStageData((prev) => ({ ...prev, selectedList }))
              }
            />
          </section>
          {activeSubStageData.materials &&
            activeSubStageData.materials.length > 0 && (
              <section className={styles.section}>
                <h3>Malzemeler ve seri numaraları</h3>

                <MaterialList
                  materials={activeSubStageData.materials}
                  disabled={isLocked}
                  onChange={(materials) => console.log(materials)}
                />
              </section>
            )}

          <section className={styles.section}>
            <h3>Açıklama</h3>
            <textarea
              value={activeSubStageData.description}
              disabled={isLocked}
              className={styles.textarea}
              placeholder="Açıklama giriniz..."
              onChange={(e) => console.log(e.target.value)}
            />
          </section>

          <section className={styles.section}>
            <h3>Görseller</h3>
            <ImageUploader
              images={activeSubStageData.images}
              disabled={isLocked}
              onChange={(images) => console.log(images)}
            />
          </section>
        </div>

        <div className={styles.footer}>
          {activeSubStageData.status === "active" && (
            <button className={styles.completeBtn} onClick={completeStage}>
              Değişiklikleri Kaydet
            </button>
          )}

          <button
            className={styles.completeBtn}
            disabled={activeSubStageData.status !== "active"}
            onClick={completeStage}
          >
            Aşamayı tamamla
          </button>
        </div>
      </div>
    </Modal>
  );
}
