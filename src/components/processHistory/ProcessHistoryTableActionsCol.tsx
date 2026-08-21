import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

// import { extractApiError } from "@/utils/extractApiError";
import { PopoverBody } from "../Popover";

import { ProcessHistoryDetailModal } from "./ProcessHistoryDetailModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const ProcessHistoryTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("processHistory");
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.processes.delete, {
        type: ProcessQueryTypes.deleteProcess,
        id,
      });
      dispatch(
        addToastify({
          message: t("notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "deleteProcessHistorySuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.deleteError")),
          type: "error",
          icon: "close",
          id: "deleteProcessHistorySuccess" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <ProcessHistoryDetailModal id={id} />
      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button type="button" className={styles["delete-btn"]}>
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
            <button type="button">{t("deletePopover.no")}</button>
            <button type="button" onClick={onDeleteHandler}>{t("deletePopover.yes")}</button>
          </div>
        }
      />
    </div>
  );
};
