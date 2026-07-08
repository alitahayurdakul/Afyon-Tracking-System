import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetStageDetailDataQuery } from "@/api/queries/useGetStagesQueries";
import { EDIT_STAGE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { IStageType } from "@/types/stagesTypes";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditStageForm } from "./EditStageForm";
import { EditStageModalWrapper } from "./EditStageModalWrapper";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const t = useTranslations("stages");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_STAGE_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", `${EDIT_STAGE_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>

      {isOpen && <EditStageModalWrapper id={id} />}
    </>
  );
};
