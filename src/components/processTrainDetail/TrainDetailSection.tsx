"use client";

import { useTranslations } from "next-intl";

import styles from "@/styles/components/processTrainDetail/TrainDetailSection.module.scss";
import { ITrainType } from "@/types/trainsTypes";
import { formatDate } from "@/utils/formDate";


export default function TrainDetailSection({ trainSet }: {trainSet?: ITrainType}) {
  const t = useTranslations("processTrainDetail");

  const wagonCount = trainSet?.wagons?.length;
  const isActive = trainSet?.wagons?.some((wagon) => wagon.isActive);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon} aria-hidden="true">
            <TrainIcon />
          </span>
          <div>
            <p className={styles.title}>{trainSet?.desc ?? "-"}</p>
            <p className={styles.subtitle}>
              {t("trainDetail.trainSetNoLabel")}: {trainSet?.trainSetNo ?? "-"}
            </p>
          </div>
        </div>

        <span
          className={`${styles.statusBadge} ${
            isActive ? styles.active : styles.inactive
          }`}
        >
          {isActive ? t("trainDetail.statusActive") : t("trainDetail.statusInactive")}
        </span>
      </div>

      <div className={styles.infoGrid}>
        <div>
          <p className={styles.infoLabel}>{t("trainDetail.creatorLabel")}</p>
          <p className={styles.infoValue}>{trainSet?.creator ?? "-"}</p>
        </div>

        <div>
          <p className={styles.infoLabel}>{t("trainDetail.wagonCountLabel")}</p>
          <p className={styles.infoValue}>
            {t("trainDetail.wagonCountValue", { count: wagonCount ?? "-" })}
          </p>
        </div>

        <div>
          <p className={styles.infoLabel}>{t("trainDetail.createdAtLabel")}</p>
          <p className={styles.infoValue}>
            {formatDate(trainSet?.createdAt)}
          </p>
        </div>

        <div>
          <p className={styles.infoLabel}>{t("trainDetail.updatedAtLabel")}</p>
          <p className={styles.infoValue}>
            {formatDate(trainSet?.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

function TrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="5" y="4" width="14" height="12" rx="3" />
      <path d="M5 12h14" />
      <path d="M9 16l-2 4" />
      <path d="M15 16l2 4" />
      <path d="M8 8h1" />
      <path d="M15 8h1" />
    </svg>
  );
}