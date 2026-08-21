import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { UserQueryTypes } from "@/app/api/users/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditUsersModal } from "./edit/EditUsersModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";
import compactStyles from "@/styles/components/users/UsersTableActionsCol.module.scss";

export const UsersTableActionsCol = ({ id }: { id: string }) => {
  const t = useTranslations("users");
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.user.delete, {
        type: UserQueryTypes.deleteUser,
        id,
      });
      dispatch(
        addToastify({
          message: t("notifications.deleteSuccess"),
          type: "success",
          icon: "close",
          id: "deleteUser" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("users"));
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.deleteError")),
          type: "error",
          icon: "close",
          id: "deleteUser" + Date.now(),
        }),
      );
    }
  };

  return (
    <div
      className={clsx(styles["table-actions"], compactStyles["table-actions"])}
    >
      <EditUsersModal id={id} />
      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button
            className={clsx(styles["delete-btn"], compactStyles["compact-btn"])}
          >
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
