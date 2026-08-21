import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DETAIL_PROCESS_HISTORY_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { ProcessHistoryDetailModalWrapper } from "./ProcessHistoryDetailModalWrapper";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const ProcessHistoryDetailModal = ({ id }: { id: string }) => {
  const t = useTranslations("processHistory");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${DETAIL_PROCESS_HISTORY_MODAL}_${id}`;
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        type="button"
        className={styles["edit-btn"]}
        onClick={() =>
          addQueryParam("modal", `${DETAIL_PROCESS_HISTORY_MODAL}_${id}`)
        }
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.detail")}</span>
      </button>
      {isOpen && <ProcessHistoryDetailModalWrapper id={id} />}
    </>
  );
};
