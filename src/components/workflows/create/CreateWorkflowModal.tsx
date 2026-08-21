import { useState } from "react";
import { useTranslations } from "next-intl";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_WORKFLOW_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";

import { CreateWorkflowForm } from "./CreateWorkflowForm";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const CreateWorkflowModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const t = useTranslations("workflows");

  return (
    <>
      <button
        type="button"
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_WORKFLOW_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("buttons.create")}
      </button>

      <Modal
        name={CREATE_WORKFLOW_MODAL}
        width={"900px"}
        height={"auto"}
        title={t("modal.create-headers")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateWorkflowForm />
      </Modal>
    </>
  );
};
