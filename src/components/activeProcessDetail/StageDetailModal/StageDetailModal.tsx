"use client";

import StageDetailModalContent from "./StageDetailModalContent";
import styles from "../ProcessFlow.module.scss";
import { useState } from "react";
import { useAddQueryParam } from "@/utils/searchParams";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";

export default function StageDetailModal({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const addQueryParam = useAddQueryParam();
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
        Detayı aç
      </button>

      <StageDetailModalContent id={id} open={open} setOpen={setOpen} />
    </>
  );
}
