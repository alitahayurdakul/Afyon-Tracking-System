import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

import { PopoverBody } from "../Popover";
import { EditSubStagesModal } from "./edit/EditSubStagesModal";

export const SubStagesTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.subStage.delete, {
        type: SubStageQueryTypes.deleteSubStage,
        id,
      });
      dispatch(
        addToastify({
          message: "Silme başarılı",
          type: "success",
          icon: "close",
          id: "deleteSubStage" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err?.message ||
        "Silme başarısız";
      dispatch(
        addToastify({
          message: errorMessage,
          type: "error",
          icon: "close",
          id: "deleteSubStage" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <EditSubStagesModal id={id} />
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
              Alt aşamayı silmek istediğinize emin misiniz?
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
