import { useTranslations } from "next-intl";

import { useGetSubStageDetailDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_SUB_STAGE_MODAL } from "@/consts/modals";

import { EditSubStageForm } from "./EditSubStageForm";

export const EditSubStageModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("subStages");

  const { data, isFetching, isLoading } = useGetSubStageDetailDataQuery(id);

  return (
    <>
      {!isFetching && !isLoading && (
        <Modal
          name={`${EDIT_SUB_STAGE_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditSubStageForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
