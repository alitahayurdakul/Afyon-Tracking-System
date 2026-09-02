import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axiosInstance } from "@/api/axiosInstance";
import { MaterialQueryTypes } from "@/app/api/materials/route";
import { RoleWrapper } from "@/components/RoleWrapper";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PERMISSION_ACTION, PERMISSION_RESOURCE } from "@/consts/permissions";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";

import { EditMaterialsModal } from "./edit/EditMaterialsModal";

import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

export const MaterialsTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const t = useTranslations("materials");

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.material.delete, {
        type: MaterialQueryTypes.deleteMaterial,
        id,
      });
      dispatch(
        addToastify({
          message: t("notifications.delete.success"),
          type: "success",
          icon: "close",
          id: "deleteMaterial" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("materials"));
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.delete.error")),
          type: "error",
          icon: "close",
          id: "deleteMaterial" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.MATERIAL}
        action={PERMISSION_ACTION.WRITE}
      >
        <EditMaterialsModal id={id} />
      </RoleWrapper>
      <RoleWrapper
        resource={PERMISSION_RESOURCE.MATERIAL}
        action={PERMISSION_ACTION.DELETE}
      >
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
              <button type="button" onClick={onDeleteHandler}>
                {t("yes")}
              </button>
            </div>
          }
        />
      </RoleWrapper>
    </div>
  );
};
