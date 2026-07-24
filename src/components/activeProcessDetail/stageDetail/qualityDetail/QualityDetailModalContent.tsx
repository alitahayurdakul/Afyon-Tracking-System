"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  useCompleteStage,
} from "@/api/queries/useGetStageDetailDataQuery";
import { PopoverBody } from "@/components/Popover";
import {
  DelayReasons,
  MaterialEntry,
  SubStage,
} from "@/types/activeProcessDetailTypes";
import { IStage } from "@/types/processTypes";
import { StatusEnums } from "@/utils/enum/commonEnums";
import { getStatus } from "@/utils/getStatus";

import styles from "../QualityDetailModal.module.scss";

const Chevron = ({ open, small }: { open: boolean; small?: boolean }) => (
  <svg
    className={`${styles.chevron} ${open ? styles.chevronOpen : ""} ${small ? styles.small : ""}`}
    viewBox="0 0 24 24"
    width={small ? 14 : 18}
    height={small ? 14 : 18}
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const QualityDetailModalContent = ({
  stages,
  entryId,
  stageStatus,
}: {
  stages?: IStage[];
  entryId: string;
  stageStatus: string;
}) => {
  const [openStages, setOpenStages] = useState<Set<string>>(new Set());
  const [openSubStages, setOpenSubStages] = useState<Set<string>>(new Set());
  const t = useTranslations("activeProcessDetail");

  const toggle = (
    set: Set<string>,
    setFn: (s: Set<string>) => void,
    id: string,
  ) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setFn(next);
  };

  const {
    mutate: completeStageMutate,
    // isPending: completeStagePending,
    // isError: completeStageisError,
    // error: completeStageError,
  } = useCompleteStage();

  const completeStage = async () => {
    completeStageMutate({ entryId });
  };

  return (
    <div className={styles.accordion}>
      {stages &&
        stages
          .sort((a, b) => a.plannedOrder - b.plannedOrder)
          .map((stage) => {
            const isOpen = openStages.has(stage._id);
            return (
              <div key={stage._id} className={styles.stageItem}>
                <button
                  type="button"
                  className={styles.stageHeader}
                  onClick={() => toggle(openStages, setOpenStages, stage._id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.stageOrder}>
                    {stage.plannedOrder}
                  </span>
                  <div className={styles.stageTitleWrap}>
                    <span className={styles.stageName}>{stage.name}</span>
                    <span
                      className={`${styles.statusBadge} ${styles[stage.status.toLowerCase()]}`}
                    >
                      {t(`status.${getStatus(stage.status)}`)}
                    </span>
                  </div>
                  <Chevron open={isOpen} />
                </button>

                {isOpen && (
                  <div className={styles.stageBody}>
                    {stage.description && (
                      <p className={styles.stageDescription}>
                        {stage.description}
                      </p>
                    )}

                    {stage.subStages.length === 0 ? (
                      <p className={styles.empty}>{t("section.no-sub-stages")}</p>
                    ) : (
                      <div className={styles.subAccordion}>
                        {stage.subStages.map((sub: SubStage) => {
                          const subOpen = openSubStages.has(sub._id);
                          return (
                            <div key={sub._id} className={styles.subStageItem}>
                              <button
                                type="button"
                                className={styles.subStageHeader}
                                onClick={() =>
                                  toggle(
                                    openSubStages,
                                    setOpenSubStages,
                                    sub._id,
                                  )
                                }
                                aria-expanded={subOpen}
                              >
                                <span className={styles.subStageName}>
                                  {sub.subStageId.name}
                                </span>
                                <span
                                  className={`${styles.statusBadge} ${styles.small} ${styles[sub.status.toString().toLowerCase()]}`}
                                >
                                  {t(`status.${getStatus(sub.status)}`)}
                                </span>
                                <Chevron open={subOpen} small />
                              </button>

                              {subOpen && (
                                <div className={styles.subStageBody}>
                                  {sub.subStageId.description && (
                                    <p className={styles.subStageDescription}>
                                      {sub.description}
                                    </p>
                                  )}
                                  {!!sub.materials?.length && (
                                    <ul className={styles.materialList}>
                                      <b>{t("section.materials")}</b>
                                      {sub.materials.map((m: MaterialEntry) => (
                                        <li key={m._id}>
                                          {m.name}{" "}
                                          <span className={styles.materialCode}>
                                            ({m.materialCode})
                                          </span>{" "}
                                          - <b>{m.serialNumber}</b>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {!!sub.delayReasons?.length && (
                                    <ul className={styles.materialList}>
                                      <b>{t("section.delay-reason")}</b>
                                      {sub.delayReasons.map(
                                        (m: DelayReasons) => (
                                          <li key={m._id}>
                                            {m.name}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      <div
        className={styles.footer}
        style={{
          borderTop:
            getStatus(stageStatus) !== StatusEnums.completed
              ? "0.5px solid #d3d1c7"
              : "none",
        }}
      >
        {getStatus(stageStatus) === StatusEnums.active && (
          <PopoverBody
            alignOffset={-73}
            align="start"
            triggerBody={
              <button className={styles.completeParentStageBtn}>
                {t("buttons.complete-quality-stage")}
              </button>
            }
            contentBody={
              <div className={styles["content"]}>
                <p className={styles["text"]}>
                  {t("buttons.questions.completeQualityStage")}
                </p>
              </div>
            }
            closeContainer={
              <div className={styles["btn-container"]}>
                <button>{t("no")}</button>
                <button onClick={completeStage}>{t("yes")}</button>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};
