import { useState } from "react";
import { useTranslations } from "next-intl";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_SUB_STAGE_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";

import { CreateSubStageForm } from "./CreateSubStageForm";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const CreateSubStagesModal = () => {
  const t = useTranslations("subStages");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        type="button"
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_SUB_STAGE_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("addButton")}
      </button>

      <Modal
        name={CREATE_SUB_STAGE_MODAL}
        width={"900px"}
        height={"auto"}
        title={t("modal.create")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateSubStageForm />
      </Modal>
    </>
  );
};
