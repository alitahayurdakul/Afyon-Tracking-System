import { useTranslations } from "next-intl";

import { useGetSubStageDetailDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_SUB_STAGE_MODAL } from "@/consts/modals";

import { EditSubStageForm } from "./EditSubStageForm";

export const EditSubStageModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("subStages");

  const { data, isFetching, isLoading } = useGetSubStageDetailDataQuery(id);

  return (
    <>
      {!isFetching && !isLoading && (
        <NewModal
          name={`${EDIT_SUB_STAGE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditSubStageForm id={id} data={data} />
        </NewModal>
      )}
    </>
  );
};
