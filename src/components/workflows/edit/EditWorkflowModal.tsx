import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_WORKFLOW_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditWorkflowModalWrapper } from "./EditWorkflowModalWrapper";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("workflows");
  const modalName = `${EDIT_WORKFLOW_MODAL}_${id}`;
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", modalName)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("buttons.edit")}</span>
      </button>

      {isOpen && <EditWorkflowModalWrapper id={id} />}
    </>
  );
};
