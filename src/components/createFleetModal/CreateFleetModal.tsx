import { useState } from "react";
import { useTranslations } from "next-intl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CREATE_FLEET } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../common/Modal";

import { CreateFleetForm } from "./CreateFleetForm";

import styles from "@/styles/components/CreateFleetModal.module.scss";

export const CreateFleetModal = () => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const t = useTranslations("layout");

  return (
    <>
      <button
        type="button"
        className={styles["fleet-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", CREATE_FLEET);
          }
        }}
      >
        <FontAwesomeIcon icon="circle-plus" />
        <span>{t("fleetForm.header")}</span>
      </button>

      <Modal
        name={CREATE_FLEET}
        width={"900px"}
        height={"auto"}
        title={t("fleetForm.header")}
        isCloseOutside={false}
        isCloseEsc={false}
        enableParams={true}
        open={open}
        setOpen={setOpen}
      >
        <CreateFleetForm />
      </Modal>
    </>
  );
};
