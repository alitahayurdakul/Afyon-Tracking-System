import styles from "@/styles/components/common/TableActionsCol.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditReasonsModal } from "./edit/EditReasonsModal";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { PopoverBody } from "../Popover";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";

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
