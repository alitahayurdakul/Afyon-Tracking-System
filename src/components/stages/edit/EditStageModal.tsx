import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { EDIT_STAGE_MODAL } from "@/consts/modals";
import { addToastify } from "@/redux/slices/toastSlice";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditStageModalWrapper } from "./EditStageModalWrapper";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const t = useTranslations("stages");
  const dispatch = useDispatch();
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_STAGE_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  const onEditClick = () => {
    if (id === "6a548d7444cc81ed74b22b6a") {
      dispatch(
        addToastify({
          message: t("form.notifications.blockedQualityStageEdit"),
          type: "error",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
      return null;
    }
    addQueryParam("modal", `${EDIT_STAGE_MODAL}_${id}`);
  };

   if (id === "6a548d7444cc81ed74b22b6a") {
      return null;
    }

  return (
    <>
      <button className={styles["edit-btn"]} onClick={onEditClick}>
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>

      {isOpen && <EditStageModalWrapper id={id} />}
    </>
  );
};
