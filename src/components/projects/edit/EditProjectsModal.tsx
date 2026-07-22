import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EDIT_PROJECT_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditProjectModalWrapper } from "./EditProjectModalWrapper";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const EditProjectsModal = ({ id }: { id: string }) => {
  const t = useTranslations("projects");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_PROJECT_MODAL}_${id}`;
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", `${EDIT_PROJECT_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {isOpen && <EditProjectModalWrapper id={id} />}
    </>
  );
};
