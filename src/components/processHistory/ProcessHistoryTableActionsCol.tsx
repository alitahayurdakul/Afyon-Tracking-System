import { useTranslations } from "next-intl";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { extractApiError } from "@/utils/extractApiError";
import { PopoverBody } from "../Popover";

import { ProcessHistoryDetailModal } from "./ProcessHistoryDetailModal";

// import { useDispatch } from "react-redux";
// import { axiosInstance } from "@/api/axiosInstance";
// import { ProjectQueryTypes } from "@/app/api/projects/route";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { addToastify } from "@/redux/slices/toastSlice";
// import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const ProcessHistoryTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("processHistory");
  // const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    // try {
    //   await axiosInstance.post(CLIENT_END_POINTS.project.delete, {
    //     type: ProjectQueryTypes.deleteProject,
    //     id,
    //   });
    //   dispatch(
    //     addToastify({
    //       message: t("form.notifications.deleteSuccess"),
    //       type: "success",
    //       icon: "close",
    //       id: "deleteProject" + Date.now(),
    //     }),
    //   );
    //   dispatch(addTriggerTable());
    // } catch (err: any) {
    //   dispatch(
    //     addToastify({
    //       message: extractApiError(err, t("form.notifications.deleteError")),
    //       type: "error",
    //       icon: "close",
    //       id: "deleteProject" + Date.now(),
    //     }),
    //   );
    // }
  };

  return (
    <div className={styles["table-actions"]}>
      <ProcessHistoryDetailModal id={id} />
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
