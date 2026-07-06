"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetStageDetailDataQuery } from "@/api/queries/useGetStageDetailDataQuery";
import { Modal } from "@/components/common/Modal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { DelayReasons, MaterialEntry, SubStage } from "@/types/activeProcessDetailTypes";
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
  stageName: string;
}

interface NewSubStageData {
  reasonList: IOptionType["value"][];
  materialList: MaterialEntry[]; // or whatever this should actually be
}

export default function StageDetailModalContent({
  id,
  open,
  setOpen,
  stageName,
}: StageDetailModalProps) {
  const t = useTranslations("activeProcessDetail");
  const {
    data: subStagesData,
    isLoading,
    isError,
  } = useGetStageDetailDataQuery<SubStage[]>(id);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevSubStagesData, setPrevSubStagesData] = useState(subStagesData);
  console.log(subStagesData);

  if (subStagesData !== prevSubStagesData) {
    setPrevSubStagesData(subStagesData);
    const index = subStagesData?.findIndex(
      (s: SubStage) => getStatus(s.status, "value") === "active",
    );
    if (index !== undefined && index !== -1) {
      setActiveIndex(index);
    }
  }

  const activeSubStageData = subStagesData?.[activeIndex];

  const [newSubStageData, setNewSubStageData] = useState<NewSubStageData>({
    reasonList:
      activeSubStageData?.delayReasons?.map(
        (reason: DelayReasons) => reason.id,
      ) || [],
    materialList: [],
  });
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    setNewSubStageData({
      reasonList:
        activeSubStageData?.delayReasons?.map(
          (reason: DelayReasons) => reason.id,
        ) || [],
      materialList: [],
    });
  }

  console.log(newSubStageData);

  if (!activeSubStageData) return null;

  const isLocked = getStatus(activeSubStageData.status, "value") !== "active";

  const completeStage = () => {
    if (activeIndex < subStagesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const saveStageChanges = () => {
    if (activeIndex < subStagesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const startStage = () => {
    if (activeIndex < subStagesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Modal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      width="900px"
      height="auto"
      title={`${t("stage-modal-header")} — ${stageName || ""}`}
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
            <StatusChip
              status={getStatus(activeSubStageData.status, "value")}
              t={t}
            />
          </div>
        </div>

        <Stepper
          subStages={subStagesData ?? []}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <div className={styles.body}>
          {/* <TimeSection
            endDate={activeSubStageData.end}
            startDate={activeSubStageData.start}
          /> */}
          <section className={styles.section}>
            <h3>{t("section.delay-reason")}</h3>
            <DelayReasonGroup
              reasonList={newSubStageData.reasonList}
              disabled={isLocked}
              onChange={(reasonList) =>
                setNewSubStageData((prev) => ({ ...prev, reasonList }))
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
                  onChange={(materials) => {
                    setNewSubStageData((prev) => ({
                      ...prev,
                      materialList: materials,
                    }));
                  }}
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

          {/* <section className={styles.section}>
            <h3>{t("section.files")}</h3>
            <ImageUploader
              images={activeSubStageData.images}
              disabled={isLocked}
              onChange={(images) => console.log(images)}
            />
          </section>*/}
        </div>

        <div className={styles.footer}>
          {getStatus(activeSubStageData.status, "value") === "active" && (
            <>
              <button className={styles.saveBtn} onClick={saveStageChanges}>
                {t("buttons.save-changes")}
              </button>
              <button className={styles.completeBtn} onClick={completeStage}>
                {t("buttons.complete-stage")}
              </button>
            </>
          )}

          {getStatus(activeSubStageData.status, "value") === "pending" && (
            <button className={styles.startBtn} onClick={startStage}>
              {t("buttons.start-stage")}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
