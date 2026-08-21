import { useTranslations } from "next-intl";

import { useGetStageDetailDataQuery } from "@/api/queries/useGetStagesQueries";
import { Modal } from "@/components/common/Modal";
import {  EDIT_STAGE_MODAL } from "@/consts/modals";
import { IStageType } from "@/types/stagesTypes";

import { EditStageForm } from "./EditStageForm";

export const EditStageModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("stages");
  const { data, isLoading, isError, isFetching } =
    useGetStageDetailDataQuery<IStageType>(id);

  return (
    <>
      {!isFetching && !isLoading && !isError && (
        <Modal
          name={`${EDIT_STAGE_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditStageForm id={id} stageData={data} />
        </Modal>
      )}
    </>
  );
};
