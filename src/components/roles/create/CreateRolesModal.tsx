import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_ROLE_MODAL } from "@/consts/modals";
import { CreateRoleForm } from "./CreateRoleForm";

export const CreateRolesModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) addQueryParam("modal", CREATE_ROLE_MODAL);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni Rol Ekle
      </button>

      <Modal
        name={CREATE_ROLE_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Rol Oluştur"
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateRoleForm />
      </Modal>
    </>
  );
};
