import { useTranslations } from "next-intl";
import React, { useState } from "react";

import styles from "@/components/activeProcessDetail/stageDetail/QualityDetailModal.module.scss";
import TimeSection from "@/components/activeProcessDetail/stageDetail/sections/TimeSection";
import {
  DelayReasons,
  MaterialEntry,
  SubStage,
} from "@/types/activeProcessDetailTypes";
import { IStage } from "@/types/processTypes";
import { getStatus } from "@/utils/getStatus";

const StagesInfo = ({ stages }: { stages: IStage[] }) => {
  const [openStages, setOpenStages] = useState<Set<string>>(new Set());
  const [openSubStages, setOpenSubStages] = useState<Set<string>>(new Set());
  const t = useTranslations("processHistory");
  const toggle = (
    set: Set<string>,
    setFn: (s: Set<string>) => void,
    id: string,
  ) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setFn(next);
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
                      <p className={styles.empty}>
                        {t("section.no-sub-stages")}
                      </p>
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
                                  <TimeSection
                                    startDate={sub.start}
                                    endDate={sub.end}
                                    status={getStatus(sub.status)}
                                    className={styles["time-section"]}
                                  />
                                  {sub.subStageId.description && (
                                    <p className={styles.subStageDescription}>
                                      {sub.subStageId.description}
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
                                          <li key={m._id}>{m.name}</li>
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
    </div>
  );
};

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

export default StagesInfo;
