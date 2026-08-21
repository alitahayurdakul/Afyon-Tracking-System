import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { StageQueryTypes } from "@/app/api/stages/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { QUALITY_STAGE_ID } from "@/consts/workflowConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditWorkflowModal } from "./edit/EditStageModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const StagesTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("stages");
  const dispatch = useDispatch();
  const qualityId = QUALITY_STAGE_ID;

  const onDeleteHandler = async () => {
    try {
      if (id === qualityId) {
        dispatch(
          addToastify({
            message: t("form.notifications.blockedQualityStageDelete"),
            type: "error",
            icon: "close",
            id: "contactePage" + Date.now(),
          }),
        );
        return;
      }
      await axiosInstance.post(CLIENT_END_POINTS.stage.delete, {
        type: StageQueryTypes.deleteStage,
        id,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("stages"));
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.deleteError")),
          type: "error",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <EditWorkflowModal id={id} />

      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button className={styles["delete-btn"]}>
            <FontAwesomeIcon icon={faTrash} />
            <span>{t("actions.delete")}</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              {t("deletePopover.question")}
            </p>
          </div>
        }
        closeContainer={
          <div className={stylesDeletePopover["btn-container"]}>
            <button>{t("deletePopover.no")}</button>
            <button onClick={onDeleteHandler}>{t("deletePopover.yes")}</button>
          </div>
        }
      />
    </div>
  );
};
