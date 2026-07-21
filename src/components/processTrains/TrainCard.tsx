"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import styles from "@/styles/components/processTrains/ProcessTrainContainer.module.scss";

export interface TrainCardProps {
  code: string;
  name: string;
  wagonCount: number;
  processCount: number;
  activeProcessCount: number;
  completedProcessCount: number;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MAX_SEGMENTS = 12;

export const TrainCard = ({
  code,
  name,
  wagonCount,
  processCount,
  activeProcessCount,
  completedProcessCount,
  description,
  isActive = false,
  onClick,
}: TrainCardProps) => {
  const t = useTranslations("processTrains");
  const shown = Math.min(wagonCount, MAX_SEGMENTS);
  const overflow = wagonCount - MAX_SEGMENTS;

  const activePct =
    processCount > 0 ? (activeProcessCount / processCount) * 100 : 0;
  const completedPct =
    processCount > 0 ? (completedProcessCount / processCount) * 100 : 0;

  return (
    <div
      className={clsx(styles["train-card"], !isActive && styles["is-idle"])}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles["card-top"]}>
        <span className={styles["train-code"]}>{code}</span>
        <span
          className={clsx(
            styles["status-pill"],
            isActive ? styles["active"] : styles["idle"],
          )}
        >
          <span className={styles["dot"]} />
          {isActive ? t("active") : t("pending")}
        </span>
      </div>

      <h3 className={styles["train-name"]}>{name}</h3>

      <div className={styles["rail-row"]}>
        <div className={styles["rail"]}>
          {Array.from({ length: shown }).map((_, i) => (
            <div
              key={i}
              className={clsx(styles["car"], isActive && styles["filled"])}
              style={{ animationDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
        <span className={styles["rail-caption"]}>
          {t.rich(wagonCount === 1 ? "wagonCount" : "multipleWagonCount", {
            count: wagonCount,
          })}
          {overflow > 0 ? ` (+${overflow})` : ""}
        </span>
      </div>

      <p className={styles["desc"]}>{description}</p>

      <div className={styles["card-foot"]}>
        <div className={styles["foot-top"]}>
          <div className={styles["process-count"]}>
            <span className={styles["num"]}>{processCount}</span>
            <span className={styles["label"]}>
              {processCount === 1
                ? t("totalProcess")
                : t("multipleTotalProcess")}
            </span>
          </div>
          <button
            className={styles["go-btn"]}
            aria-label="Trene git"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {processCount > 0 ? (
          <>
            <div className={styles["process-bar"]}>
              <div
                className={clsx(styles["seg"], styles["active"])}
                style={{ width: `${activePct}%` }}
              />
              <div
                className={clsx(styles["seg"], styles["completed"])}
                style={{ width: `${completedPct}%` }}
              />
            </div>
            <div className={styles["process-legend"]}>
              <span className={clsx(styles["item"], styles["active"])}>
                <span className={styles["dot"]} />
                {t.rich("activeProcessCount", {
                  count: activeProcessCount,
                })}
              </span>
              <span className={clsx(styles["item"], styles["completed"])}>
                <span className={styles["dot"]} />
                {t.rich("completedProcessCount", {
                  count: completedProcessCount,
                })}
              </span>
            </div>
          </>
        ) : (
          <div className={styles["process-legend"]}>
            <span className={styles["empty"]}>Henüz süreç başlatılmadı</span>
          </div>
        )}
      </div>
    </div>
  );
};
