import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetStageDetailDataQuery } from "@/api/queries/useGetStagesQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { IStageType } from "@/types/stagesTypes";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditStageForm } from "./EditStageForm";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const t = useTranslations("stages");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  const { data, isLoading, isError, isFetching } =
    useGetStageDetailDataQuery<IStageType>(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `EDIT_STAGE_MODAL_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>

      {!isFetching && (
        <Modal
          name={`EDIT_STAGE_MODAL_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditStageForm id={id} stageData={data} />
        </Modal>
      )}
    </>
  );
};
