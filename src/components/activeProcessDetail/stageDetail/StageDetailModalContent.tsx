"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useCompleteStage,
  useEditSubStage,
  useGetStageDetailDataQuery,
  useSaveSubStage,
  useStartSubStage,
} from "@/api/queries/useGetStageDetailDataQuery";
import { NewModal } from "@/components/common/NewModal";
import { PopoverBody } from "@/components/Popover";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import {
  DelayReasons,
  MaterialEntry,
  SubStage,
} from "@/types/activeProcessDetailTypes";
import { ResponseStatusEnums, StatusEnums } from "@/utils/enum/commonEnums";
import { getStatus } from "@/utils/getStatus";

import StatusChip from "../StatusChip";

import TimeSection from "./sections/TimeSection";
import DelayReasonGroup from "./DelayReasonGroup";
import MaterialList from "./MaterialList";
import Stepper from "./Stepper";

import styles from "./StageDetailModal.module.scss";

interface StageDetailModalProps {
  id: string;
  stageName: string;
  entryId: string;
  stageStatus: string;
}

interface NewSubStageData {
  reasonList: DelayReasons[];
  materialList: MaterialEntry[]; // or whatever this should actually be
  description: string;
}

export default function StageDetailModalContent({
  id,
  stageName,
  entryId,
  stageStatus,
}: StageDetailModalProps) {
  const t = useTranslations("activeProcessDetail");
  const { data: subStagesData } = useGetStageDetailDataQuery<SubStage[]>(id);

  const { id: processId } = useParams();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState<number>(0);
  const [prevSubStagesData, setPrevSubStagesData] = useState(subStagesData);
  const { mutate, isPending } = useStartSubStage();

  const { mutate: saveMutate, isPending: saveIsPending } = useSaveSubStage();

  const { mutate: editMutate, isPending: editIsPending } = useEditSubStage();

  const { mutate: completeStageMutate, isPending: completeIsPending } =
    useCompleteStage();

  if (subStagesData !== prevSubStagesData) {
    setPrevSubStagesData(subStagesData);
    const index = subStagesData?.findIndex(
      (s: SubStage) => getStatus(s.status) === "active",
    );
    if (index !== undefined && index !== -1) {
      setActiveIndex(index);
    }
  }

  const isAllCompleted = useMemo(
    () =>
      (subStagesData ?? []).length > 0 &&
      subStagesData!.every(
        (subStage: SubStage) =>
          getStatus(subStage.status) === StatusEnums.completed,
      ),
    [subStagesData],
  );

  const activeSubStageData = subStagesData?.[activeIndex];

  const [newSubStageData, setNewSubStageData] = useState<NewSubStageData>({
    reasonList:
      activeSubStageData?.delayReasons?.map((reason: DelayReasons) => ({
        _id: reason._id,
        name: reason.name,
      })) || [],
    materialList: activeSubStageData?.materials ?? [],
    description: activeSubStageData?.description ?? "",
  });

  if (subStagesData !== prevSubStagesData) {
    setPrevSubStagesData(subStagesData);
    const index = subStagesData?.findIndex(
      (s: SubStage) => getStatus(s.status) === "active",
    );
    const resolvedIndex =
      index !== undefined && index !== -1 ? index : activeIndex;

    if (index !== undefined && index !== -1) {
      setActiveIndex(index);
    }

    const loadedSubStage = subStagesData?.[resolvedIndex];
    setNewSubStageData({
      reasonList:
        loadedSubStage?.delayReasons?.map((reason: DelayReasons) => ({
          _id: reason._id,
          name: reason.name,
        })) || [],
      materialList: loadedSubStage?.materials ?? [],
      description: loadedSubStage?.description ?? "",
    });
  }
  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    setNewSubStageData({
      reasonList:
        activeSubStageData?.delayReasons?.map((reason: DelayReasons) => ({
          _id: reason._id,
          name: reason.name,
        })) || [],
      materialList: activeSubStageData?.materials ?? [],
      description: activeSubStageData?.description ?? "",
    });
  }

  if (!activeSubStageData) return null;

  const isLocked = getStatus(activeSubStageData.status) !== "active";

  const completeSubStage = () => {
    const formData = {
      processId: processId as string,
      stageId: id,
      subStageId: activeSubStageData._id,
      data: {
        status: ResponseStatusEnums.completed,
        description: newSubStageData.description,
        delayReasons: newSubStageData.reasonList.map((reason: DelayReasons) => {
          return {
            reasonId: reason._id as string,
            name: reason.name,
          };
        }),
        materials: newSubStageData.materialList.map(
          (material: MaterialEntry) => {
            return {
              materialId: material._id,
              serialNumber: material.serialNumber,
            };
          },
        ),
      },
    };
    saveMutate(formData);
  };

  const saveStageChanges = () => {
    const formData = {
      processId: processId as string,
      stageId: id,
      subStageId: activeSubStageData._id,
      data: {
        status: ResponseStatusEnums.active,
        description: newSubStageData.description,
        delayReasons: newSubStageData.reasonList.map((reason: DelayReasons) => {
          return {
            reasonId: reason._id as string,
            name: reason.name,
          };
        }),
        materials: newSubStageData.materialList.map(
          (material: MaterialEntry) => {
            return {
              materialId: material._id,
              serialNumber: material.serialNumber,
            };
          },
        ),
      },
    };
    saveMutate(formData);
  };

  const editCompletedSubStage = async () => {
    const formData = {
      processId: processId as string,
      stageId: id,
      subStageId: activeSubStageData._id,
      data: {
        status: ResponseStatusEnums.active,
        start: activeSubStageData.start,
      },
    };
    editMutate(formData);
  };

  const startStage = async () => {
    const formData = {
      processId: processId as string,
      stageId: id,
      subStageId: activeSubStageData._id,
    };
    mutate(formData);
  };

  const completeStage = async () => {
    completeStageMutate({ entryId });
  };

  return (
    <NewModal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      width="900px"
      height="auto"
      title={`${t("stage-modal-header")} — ${stageName || ""}`}
      isCloseOutside={false}
      isCloseEsc={false}
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
            status={getStatus(activeSubStageData.status)}
          />
          <section className={styles.section}>
            <h3>{t("section.delay-reason")}</h3>
            <DelayReasonGroup
              reasonList={newSubStageData.reasonList}
              disabled={isLocked}
              isOnlyText={
                getStatus(activeSubStageData.status) === StatusEnums.completed
              }
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
                  materials={newSubStageData.materialList}
                  disabled={isLocked}
                  isOnlyText={
                    getStatus(activeSubStageData.status) ===
                    StatusEnums.completed
                  }
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
            {getStatus(activeSubStageData.status) === StatusEnums.completed ? (
              <p className={styles.descriptionText}>
                {newSubStageData.description}
              </p>
            ) : (
              <textarea
                value={newSubStageData.description}
                disabled={isLocked}
                className={styles.textarea}
                placeholder={t("explaining-placeholder")}
                onChange={(e) => {
                  setNewSubStageData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            )}
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
        {getStatus(stageStatus) !== StatusEnums.completed && (
          <div
            className={styles.footer}
            style={{
              borderTop:
                getStatus(stageStatus) !== StatusEnums.completed
                  ? "0.5px solid #d3d1c7"
                  : "none",
            }}
          >
            {getStatus(activeSubStageData.status) === "active" && (
              <>
                <PopoverBody
                  alignOffset={-73}
                  align="start"
                  triggerBody={
                    <button className={styles.saveBtn}>
                      {t("buttons.save-changes")}
                    </button>
                  }
                  contentBody={
                    <div className={styles["content"]}>
                      <p className={styles["text"]}>
                        {t("buttons.questions.save")}
                      </p>
                    </div>
                  }
                  closeContainer={
                    <div className={styles["btn-container"]}>
                      <button>{t("no")}</button>
                      <button onClick={saveStageChanges}>
                        {" "}
                        {saveIsPending ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            style={{
                              animationDuration: "2s",
                              color: "var(--slate-90)",
                            }}
                          />
                        ) : (
                          t("yes")
                        )}
                      </button>
                    </div>
                  }
                />
                <PopoverBody
                  alignOffset={-73}
                  align="start"
                  triggerBody={
                    <button className={styles.completeBtn}>
                      {t("buttons.complete-sub-stage")}
                    </button>
                  }
                  contentBody={
                    <div className={styles["content"]}>
                      <p className={styles["text"]}>
                        {t("buttons.questions.complete-sub-stage")}
                      </p>
                    </div>
                  }
                  closeContainer={
                    <div className={styles["btn-container"]}>
                      <button>{t("no")}</button>
                      <button onClick={completeSubStage}>
                        {saveIsPending ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            style={{
                              animationDuration: "2s",
                              color: "var(--slate-90)",
                            }}
                          />
                        ) : (
                          t("yes")
                        )}
                      </button>
                    </div>
                  }
                />
              </>
            )}

            {getStatus(activeSubStageData.status) === "pending" && (
              <PopoverBody
                alignOffset={-73}
                align="start"
                triggerBody={
                  <button className={styles.startBtn}>
                    {t("buttons.start-sub-stage")}
                  </button>
                }
                contentBody={
                  <div className={styles["content"]}>
                    <p className={styles["text"]}>
                      {t("buttons.questions.start-sub-stage")}
                    </p>
                  </div>
                }
                closeContainer={
                  <div className={styles["btn-container"]}>
                    <button>{t("no")}</button>
                    <button onClick={startStage}>
                      {isPending ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{
                            animationDuration: "2s",
                            color: "var(--slate-90)",
                          }}
                        />
                      ) : (
                        t("yes")
                      )}
                    </button>
                  </div>
                }
              />
            )}

            {getStatus(activeSubStageData.status) === StatusEnums.completed &&
              getStatus(stageStatus) !== StatusEnums.completed && (
                <PopoverBody
                  alignOffset={-73}
                  align="start"
                  triggerBody={
                    <button className={styles.editBtn}>
                      {t("buttons.edit")}
                    </button>
                  }
                  contentBody={
                    <div className={styles["content"]}>
                      <p className={styles["text"]}>
                        {t("buttons.questions.edit")}
                      </p>
                    </div>
                  }
                  closeContainer={
                    <div className={styles["btn-container"]}>
                      <button>{t("no")}</button>
                      <button onClick={editCompletedSubStage}>
                        {editIsPending ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            style={{
                              animationDuration: "2s",
                              color: "var(--slate-90)",
                            }}
                          />
                        ) : (
                          t("yes")
                        )}
                      </button>
                    </div>
                  }
                />
              )}

            {isAllCompleted &&
              getStatus(stageStatus) !== StatusEnums.completed && (
                <PopoverBody
                  alignOffset={-73}
                  align="start"
                  triggerBody={
                    <button className={styles.completeParentStageBtn}>
                      {t("buttons.complete-stage")}
                    </button>
                  }
                  contentBody={
                    <div className={styles["content"]}>
                      <p className={styles["text"]}>
                        {t("buttons.questions.completeStage")}
                      </p>
                    </div>
                  }
                  closeContainer={
                    <div className={styles["btn-container"]}>
                      <button>{t("no")}</button>
                      <button onClick={completeStage}>
                        {" "}
                        {completeIsPending ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            style={{
                              animationDuration: "2s",
                              color: "var(--slate-90)",
                            }}
                          />
                        ) : (
                          t("yes")
                        )}
                      </button>
                    </div>
                  }
                />
              )}
          </div>
        )}
      </div>
    </NewModal>
  );
}
