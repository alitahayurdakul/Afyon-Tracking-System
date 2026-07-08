import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_SUB_STAGE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditSubStageModalWrapper } from "./EditSubStageModalWrapper";

export const EditSubStagesModal = ({ id }: { id: string }) => {
  const t = useTranslations("subStages");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_SUB_STAGE_MODAL}_${id}`;
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", `${EDIT_SUB_STAGE_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {isOpen && <EditSubStageModalWrapper id={id} />}
    </>
  );
};
