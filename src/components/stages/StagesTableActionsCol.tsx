import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

import { PopoverBody } from "../Popover";
import { EditWorkflowModal } from "./edit/EditStageModal";

export const StagesTableActionsCol = ({ id }: { id: string }) => {
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
