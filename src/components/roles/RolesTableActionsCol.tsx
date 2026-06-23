import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";
import compactStyles from "@/styles/components/roles/RolesTableActionsCol.module.scss";
import { extractApiError } from "@/utils/extractApiError";

import { PopoverBody } from "../Popover";
import { EditRolesModal } from "./edit/EditRolesModal";

export const RolesTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.role.delete, {
        type: RoleQueryTypes.deleteRole,
        id,
      });
      dispatch(
        addToastify({
          message: "Rol silindi",
          type: "success",
          icon: "close",
          id: "deleteRole" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, "Rol silinemedi"),
          type: "error",
          icon: "close",
          id: "deleteRole" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={clsx(styles["table-actions"], compactStyles["table-actions"])}>
      <EditRolesModal id={id} />
      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button className={clsx(styles["delete-btn"], compactStyles["compact-btn"])}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Sil</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              Rolü silmek istediğinize emin misiniz?
            </p>
          </div>
        }
        closeContainer={
          <div className={stylesDeletePopover["btn-container"]}>
            <button>Hayır</button>
            <button onClick={onDeleteHandler}>Evet</button>
          </div>
        }
      />
    </div>
  );
};
