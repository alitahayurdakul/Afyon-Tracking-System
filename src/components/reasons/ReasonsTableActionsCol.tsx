import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditReasonsModal } from "./edit/EditReasonsModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const ReasonsTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const t = useTranslations("delayReasons");

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.reason.delete, {
        type: ReasonQueryTypes.deleteReason,
        id,
      });
      dispatch(
        addToastify({
          message: t("notifications.delete.success"),
          type: "success",
          icon: "close",
          id: "deleteReason" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("reasons"));
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.delete.error")),
          type: "error",
          icon: "close",
          id: "deleteReason" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <EditReasonsModal id={id} />
      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button type="button" className={styles["delete-btn"]}>
            <FontAwesomeIcon icon={faTrash} />
            <span>{t("buttons.delete")}</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              {t("delete-question")}
            </p>
          </div>
        }
        closeContainer={
          <div className={stylesDeletePopover["btn-container"]}>
            <button type="button">{t("no")}</button>
            <button type="button" onClick={onDeleteHandler}>{t("yes")}</button>
          </div>
        }
      />
    </div>
  );
};
