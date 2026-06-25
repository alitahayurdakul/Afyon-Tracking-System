import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ProjectQueryTypes } from "@/app/api/projects/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import styles from "@/styles/components/common/TableActionsCol.module.scss";
import stylesDeletePopover from "@/styles/components/common/TableDeletePopover.module.scss";

import { PopoverBody } from "../Popover";
import { EditProjectsModal } from "./edit/EditProjectsModal";

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
          message: "Silme başarılı",
          type: "success",
          icon: "close",
          id: "deleteProject" + Date.now(),
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
          id: "deleteProject" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles["table-actions"]}>
      <EditProjectsModal id={id} />
      <PopoverBody
        alignOffset={-73}
        align="start"
        triggerBody={
          <button className={styles["delete-btn"]}>
            <FontAwesomeIcon icon={faTrash} />
            <span>{t("actions.delete")}</span>
          </button>
        }
        contentBody={
          <div className={stylesDeletePopover["content"]}>
            <p className={stylesDeletePopover["text"]}>
              Projeyi silmek istediğinize emin misiniz?
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
