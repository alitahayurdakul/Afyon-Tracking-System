import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { CREATE_USER_MODAL } from "@/consts/modals";
import { CreateUserForm } from "./CreateUserForm";

export const CreateUsersModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_USER_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Yeni Kullanıcı Ekle
      </button>

      <Modal
        name={CREATE_USER_MODAL}
        width={"900px"}
        height={"auto"}
        title="Yeni Kullanıcı Oluştur"
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateUserForm />
      </Modal>
    </>
  );
};
