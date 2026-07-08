import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_TRAIN_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditTrainModalWrapper } from "./EditTrainModalWrapper";

export const EditTrainsModal = ({ id }: { id: string }) => {
  const t = useTranslations("trains");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_TRAIN_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", modalName)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {isOpen && <EditTrainModalWrapper id={id} />}
    </>
  );
};
