import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EDIT_REASON_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditReasonModalWrapper } from "./EditReasonModalWrapper";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const EditReasonsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("delayReasons");
  const searchParams = useSearchParams();
  const modalName = `${EDIT_REASON_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  return (
    <>
      <button
        type="button"
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", `${EDIT_REASON_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("buttons.edit")}</span>
      </button>
      {isOpen && <EditReasonModalWrapper id={id} />}
    </>
  );
};
