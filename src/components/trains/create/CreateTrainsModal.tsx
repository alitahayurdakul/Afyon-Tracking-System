import { useState } from "react";
import { useTranslations } from "next-intl";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_TRAIN_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";

import { CreateTrainForm } from "./CreateTrainForm";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const CreateTrainsModal = () => {
  const t = useTranslations("trains");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_TRAIN_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("addButton")}
      </button>

      <Modal
        name={CREATE_TRAIN_MODAL}
        width={"900px"}
        height={"auto"}
        title={t("modal.create")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateTrainForm />
      </Modal>
    </>
  );
};
