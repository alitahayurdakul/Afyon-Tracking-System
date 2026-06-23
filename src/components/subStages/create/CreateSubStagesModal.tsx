import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { CREATE_SUB_STAGE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { CreateSubStageForm } from "./CreateSubStageForm";

export const CreateSubStagesModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_SUB_STAGE_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni Alt Aşama Ekle
      </button>

      <Modal
        name={CREATE_SUB_STAGE_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Alt Aşama Oluştur"
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
