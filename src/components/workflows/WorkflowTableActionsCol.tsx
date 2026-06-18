import React from "react";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { EditWorkflowModal } from "./edit/EditWorkflowModal";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { axiosInstance } from "@/api/axiosInstance";
import { PopoverBody } from "../Popover";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";

export const WorkflowTableActionsCol = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = async () => {
    try {
      const data = await axiosInstance.post(CLIENT_END_POINTS.workflow.delete, {
        type: WorkflowQueryTypes.deleteWorkflow,
        id,
      });
      dispatch(
        addToastify({
          message: "Başarılı",
          type: "success",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    }
    catch (err) {
      dispatch(
        addToastify({
          message: "Silme işlemi başarısız.",
          type: "error",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
    }

  };

  return (
    <div className={styles["table-actions"]}>
      <EditWorkflowModal id={id} />

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
              Aşamayı silmek istediğinize emin misiniz?
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
