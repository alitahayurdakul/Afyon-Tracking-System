import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { useGetWorkflowDetailDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_WORKFLOW_MODAL } from "@/consts/modals";
import {
  IWorkflowFormTypes,
  IWorkflowResponseTypes,
} from "@/types/workflowTypes";

import { EditWorkflowForm } from "./EditWorkflowForm";

export const EditWorkflowModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("workflows");
  const { data, isLoading, isError, isFetching } =
    useGetWorkflowDetailDataQuery<IWorkflowResponseTypes>(id);
  const transformedData: IWorkflowFormTypes | undefined = useMemo(() => {
    if (!data) return undefined;

    return {
      ...data,
      stages: ((data.stages as any[]) ?? []).map(
        (stage: any, index: number) => ({
          value: stage?.stageInfo?._id ?? stage?.value ?? `stage-${index}`,
          label: stage?.stageInfo?.name ?? stage?.label ?? "-",
        }),
      ),
    };
  }, [data]);

  return (
    <>
      {!isFetching && !isLoading && !isError && (
        <NewModal
          name={`${EDIT_WORKFLOW_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditWorkflowForm id={id} workflowData={transformedData} />
        </NewModal>
      )}
    </>
  );
};
