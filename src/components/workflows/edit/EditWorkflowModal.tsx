import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { useGetWorkflowDetailDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import styles from "@/styles/components/common/TableListBody.module.scss";
import {
  IStageType,
  IWorkflowFormTypes,
  IWorkflowResponseTypes,
} from "@/types/workflowTypes";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditWorkflowForm } from "./EditWorkflowForm";

export const EditWorkflowModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("workflows");
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
        <span>{t("buttons.edit")}</span>
      </button>

      {!isFetching && (
        <Modal
          name={`EDIT_WORKFLOW_MODAL_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditWorkflowForm id={id} workflowData={transformedData} />
        </Modal>
      )}
    </>
  );
};
