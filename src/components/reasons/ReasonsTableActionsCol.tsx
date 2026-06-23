import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

import { PopoverBody } from "../Popover";
import { EditReasonsModal } from "./edit/EditReasonsModal";

export const ReasonsTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.reason.delete, {
        type: ReasonQueryTypes.deleteReason,
        id,
      });
      dispatch(
        addToastify({
          message: "Silme başarılı",
          type: "success",
          icon: "close",
          id: "deleteReason" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    } catch (err) {
      dispatch(
        addToastify({
          message: (err as Error)?.message || "Silme başarısız",
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
          <button className={styles["delete-btn"]}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Sil</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              Sebebi silmek istediğinize emin misiniz?
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
