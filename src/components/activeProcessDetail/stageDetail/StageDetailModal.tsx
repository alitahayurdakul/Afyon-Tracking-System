"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import StageDetailModalContent from "@/components/activeProcessDetail/stageDetail/StageDetailModalContent";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import styles from "../ProcessFlow.module.scss";

export default function StageDetailModal({ id, stageName }: { id: string, stageName: string }) {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("activeProcessDetail");
  
  return (
    <>
      <button
        className={styles.detailBtn}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${ACTIVE_STAGE_DETAIL_MODAL}_${id}`);
          }
        }}
      >
        {t("open-detail")}
      </button>

      <StageDetailModalContent id={id} open={open} setOpen={setOpen} stageName={stageName} />
    </>
  );
}
