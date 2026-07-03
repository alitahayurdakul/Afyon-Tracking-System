"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetStageDetailDataQuery } from "@/api/queries/useGetStageDetailDataQuery";
import { Modal } from "@/components/common/Modal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { StageDetail, SubStage } from "@/types/activeProcessDetailTypes";
import { IOptionType } from "@/types/formTypes";
import { getStatus } from "@/utils/getStatus";

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
  const t = useTranslations("activeProcessDetail");
  const {
    data: stageDetail,
    isLoading,
    isError,
  } = useGetStageDetailDataQuery<StageDetail>(id);

  const subStagesData = stageDetail?.subStages;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevSubStagesData, setPrevSubStagesData] = useState(subStagesData);

  if (subStagesData !== prevSubStagesData) {
    setPrevSubStagesData(subStagesData);
    const index = subStagesData?.findIndex(
      (s: SubStage) => getStatus(s.status) === "active",
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

  const isLocked = getStatus(activeSubStageData.status) !== "active";

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
      title={`${t("stage-modal-header")} — ${activeSubStageData?.name || ""}`}
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
            <StatusChip status={getStatus(activeSubStageData.status)} t={t} />
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
            <h3>{t("section.delay-reason")}</h3>
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
                <h3>{t("section.materials")}</h3>

                <MaterialList
                  materials={activeSubStageData.materials}
                  disabled={isLocked}
                  onChange={(materials) => console.log(materials)}
                />
              </section>
            )}

          <section className={styles.section}>
            <h3>{t("section.explaining")}</h3>
            <textarea
              value={activeSubStageData.description}
              disabled={isLocked}
              className={styles.textarea}
              placeholder={t("explaining-placeholder")}
              onChange={(e) => console.log(e.target.value)}
            />
          </section>

          <section className={styles.section}>
            <h3>{t("section.files")}</h3>
            <ImageUploader
              images={activeSubStageData.images}
              disabled={isLocked}
              onChange={(images) => console.log(images)}
            />
          </section>
        </div>

        <div className={styles.footer}>
          {getStatus(activeSubStageData.status) === "active" && (
            <button className={styles.saveBtn} onClick={completeStage}>
              {t("buttons.save-changes")}
            </button>
          )}

          <button
            className={styles.completeBtn}
            disabled={getStatus(activeSubStageData.status) !== "active"}
            onClick={completeStage}
          >
            {t("buttons.complete-stage")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
