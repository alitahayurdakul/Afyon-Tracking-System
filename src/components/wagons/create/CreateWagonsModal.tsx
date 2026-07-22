import { useState } from "react";
import { useTranslations } from "next-intl";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_WAGON_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";

import { CreateWagonForm } from "./CreateWagonForm";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const CreateWagonsModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const t = useTranslations("wagons");

  return (
    <>
      <button
        className={styles["primary-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_WAGON_MODAL);
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("buttons.create")}
      </button>

      <Modal
        name={CREATE_WAGON_MODAL}
        width={"900px"}
        height={"auto"}
        title={t("modal.create-headers")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateWagonForm />
      </Modal>
    </>
  );
};
