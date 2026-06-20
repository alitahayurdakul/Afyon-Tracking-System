import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/workflowList/WorkflowListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useMemo, useState } from "react";
import { EditStageForm } from "./EditStageForm";
import { useGetWorkflowDetailDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import {
  IStageType,
  IWorkflowFormTypes,
  IWorkflowResponseTypes,
} from "@/types/workflowTypes";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isLoading, isError, isFetching, refetch } =
    useGetWorkflowDetailDataQuery<IWorkflowResponseTypes>(id);

  const transformedData: IWorkflowFormTypes | undefined = useMemo(() => {
    if (!data) return undefined;

    return {
      ...data,
      stages: ((data.stages as any[]) ?? []).map((stage: any, index: number) => ({
        value: stage?.stageInfo?._id ?? stage?.value ?? `stage-${index}`,
        label: stage?.stageInfo?.name ?? stage?.label ?? "-",
      })),
    };
  }, [data]);

  // const convertedWorksflowData = useCallback(() => {
  //   const newWorkflowsData =
  // },[data])

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `EDIT_WORKFLOW_MODAL_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Güncelle</span>
      </button>

      {!isFetching && (
        <Modal
          name={`EDIT_WORKFLOW_MODAL_${id}`}
          width={"900px"}
          height={"auto"}
          title="Workflow Bilgilerini Güncelle"
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditStageForm id={id} workflowData={transformedData} />
        </Modal>
      )}
    </>
  );
};
