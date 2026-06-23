import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_TRAIN_MODAL } from "@/consts/modals";
import { CreateTrainForm } from "./CreateTrainForm";

export const CreateTrainsModal = () => {
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
        Yeni Tren Ekle
      </button>

      <Modal
        name={CREATE_TRAIN_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Tren Oluştur"
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
