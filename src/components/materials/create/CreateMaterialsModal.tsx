import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_MATERIAL_MODAL } from "@/consts/modals";
import { CreateMaterialForm } from "./CreateMaterialForm";

export const CreateMaterialsModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_MATERIAL_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni Malzeme Ekle
      </button>

      <Modal
        name={CREATE_MATERIAL_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Malzeme Oluştur"
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateMaterialForm />
      </Modal>
    </>
  );
};
