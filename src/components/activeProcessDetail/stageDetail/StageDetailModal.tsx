"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import StageDetailModalContent from "@/components/activeProcessDetail/stageDetail/StageDetailModalContent";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import styles from "../ProcessFlow.module.scss";

export default function StageDetailModal({
  id,
  stageName,
  entryId,
  stageStatus
}: {
  id: string;
  stageName: string;
  entryId: string;
  stageStatus: string
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
      {isOpen && (
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
