"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import StageDetailModalContent from "@/components/activeProcessDetail/stageDetail/StageDetailModalContent";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { IStage } from "@/types/processTypes";
import { useAddQueryParam } from "@/utils/searchParams";

import styles from "../ProcessFlow.module.scss";
import QualityDetailModal from "./QualityDetailModal";

export default function StageDetailModal({
  id,
  stageName,
  entryId,
  stageStatus,
  isQuality,
  stages,
}: {
  id: string;
  stageName: string;
  entryId: string;
  stageStatus: string;
  isQuality?: boolean;
  stages: IStage[];
}) {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("activeProcessDetail");
  const searchParams = useSearchParams();
  const modalName = `${ACTIVE_STAGE_DETAIL_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  return (
    <>
      <button
        className={styles.detailBtn}
        onClick={() => addQueryParam("modal", modalName)}
      >
        {t("open-detail")}
      </button>
      {isQuality
        ? isOpen && (
            <QualityDetailModal
              id={id}
              stageName={stageName}
              entryId={entryId}
              stageStatus={stageStatus}
              stages={stages}
            />
          )
        : isOpen && (
            <StageDetailModalContent
              id={id}
              stageName={stageName}
              entryId={entryId}
              stageStatus={stageStatus}
            />
          )}
    </>
  );
}
