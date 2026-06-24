import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetSubStageDetailDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { EDIT_SUB_STAGE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditSubStageForm } from "./EditSubStageForm";

export const EditSubStagesModal = ({ id }: { id: string }) => {
  const t = useTranslations("subStages");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetSubStageDetailDataQuery(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_SUB_STAGE_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_SUB_STAGE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditSubStageForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
