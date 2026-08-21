import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditTrainsModal } from "./edit/EditTrainsModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const TrainsTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("trains");
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.train.delete, {
        type: TrainQueryTypes.deleteTrain,
        id,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "deleteTrainSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("trains"));
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.error")),
          type: "error",
          icon: "close",
          id: "deleteTrainError" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <EditTrainsModal id={id} />
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
