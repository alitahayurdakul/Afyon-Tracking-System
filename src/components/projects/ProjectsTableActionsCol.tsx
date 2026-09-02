import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { ProjectQueryTypes } from "@/app/api/projects/route";
import { RoleWrapper } from "@/components/RoleWrapper";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PERMISSION_ACTION, PERMISSION_RESOURCE } from "@/consts/permissions";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditProjectsModal } from "./edit/EditProjectsModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const ProjectsTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("projects");
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.project.delete, {
        type: ProjectQueryTypes.deleteProject,
        id,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "deleteProject" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("projects"));
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.deleteError")),
          type: "error",
          icon: "close",
          id: "deleteProject" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.PROJECT}
        action={PERMISSION_ACTION.WRITE}
      >
        <EditProjectsModal id={id} />
      </RoleWrapper>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.PROJECT}
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
