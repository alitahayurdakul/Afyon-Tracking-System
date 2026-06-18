import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/stages/StageListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_WORKFLOW_MODAL } from "@/consts/modals";
import { CreateWorkflowForm } from "./CreateWorkflowForm";

export const CreateWorkflowModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_WORKFLOW_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni İş Akışı Ekle
      </button>

      <Modal
        name={CREATE_WORKFLOW_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni İş Akışı Oluştur"
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
