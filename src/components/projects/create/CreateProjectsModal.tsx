import { useState } from "react";
import { useTranslations } from "next-intl";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_PROJECT_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";

import { CreateProjectForm } from "./CreateProjectForm";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const CreateProjectsModal = () => {
  const t = useTranslations("projects");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        type="button"
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_PROJECT_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("addButton")}
      </button>

      <Modal
        name={CREATE_PROJECT_MODAL}
        width={"900px"}
        height={"auto"}
        title={t("modal.create")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateProjectForm />
      </Modal>
    </>
  );
};
