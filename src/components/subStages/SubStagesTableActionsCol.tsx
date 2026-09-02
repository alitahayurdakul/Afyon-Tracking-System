import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { RoleWrapper } from "@/components/RoleWrapper";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PERMISSION_ACTION, PERMISSION_RESOURCE } from "@/consts/permissions";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditSubStagesModal } from "./edit/EditSubStagesModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const SubStagesTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("subStages");
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.subStage.delete, {
        type: SubStageQueryTypes.deleteSubStage,
        id,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "deleteSubStage" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("subStages"));
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.deleteError")),
          type: "error",
          icon: "close",
          id: "deleteSubStage" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.SUBSTAGE}
        action={PERMISSION_ACTION.WRITE}
      >
        <EditSubStagesModal id={id} />
      </RoleWrapper>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.SUBSTAGE}
        action={PERMISSION_ACTION.DELETE}
      >
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
              <button type="button" onClick={onDeleteHandler}>
                {t("deletePopover.yes")}
              </button>
            </div>
          }
        />
      </RoleWrapper>
    </div>
  );
};
