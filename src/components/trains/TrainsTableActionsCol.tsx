import styles from "@/styles/components/common/TableActionsCol.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditTrainsModal } from "./edit/EditTrainsModal";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { PopoverBody } from "../Popover";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";

export const TrainsTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.train.delete, {
        type: TrainQueryTypes.deleteTrain,
        id,
      });
      dispatch(
        addToastify({
          message:id + "Başarıyla silindi",
          type: "success",
          icon: "close",
          id: "deleteTrain" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    } catch (err) {
      dispatch(
        addToastify({
          message: (err as Error)?.message || "Hata oluştu",
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
            <span>Sil</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              Treni silmek istediğinize emin misiniz?
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
