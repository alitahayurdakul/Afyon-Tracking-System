import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/reasons/ReasonListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_REASON_MODAL } from "@/consts/modals";
import { CreateReasonForm } from "./CreateReasonForm";

export const CreateReasonsModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_REASON_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni Sebep Ekle
      </button>

      <Modal
        name={CREATE_REASON_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Sebep Oluştur"
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateReasonForm />
      </Modal>
    </>
  );
};
