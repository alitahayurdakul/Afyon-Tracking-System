"use client";

import { useMemo } from "react";

import {
  useActiveProcessDetailDataQuery,
  useGetActiveProcessesDataQuery,
} from "@/api/queries/useGetProcessesQueries";
import InfoProcessContainer from "@/components/activeProcessDetail/InfoProcessContainer";
import { ProgressionContainer } from "@/components/activeProcessDetail/ProgressionContainer";
import { Topbar } from "@/components/common/Topbar";
import styles from "@/styles/pages/PageCommonContainer.module.scss";
import { IOptionType } from "@/types/formTypes";
import {
  IProcessesTypes,
  IProcessType,
  IStage,
  ProcessResponse,
} from "@/types/processTypes";
import { StatusEnums } from "@/utils/enum/commonEnums";
import { getStatus } from "@/utils/getStatus";

export default function ActiveProcessDetailPage() {
  const { data, isLoading, isError, refetch } =
    useActiveProcessDetailDataQuery<ProcessResponse>();

  const { data: activeProcessesData } =
    useGetActiveProcessesDataQuery<IProcessesTypes>();

  const trainsOptions = useMemo(() => {
    const trains =
      activeProcessesData?.map((process: IProcessType) => {
        return {
          value: process._id,
          label: `${process.locomotiveNo}${process.wagonNo ? ` - ${process.wagonNo}` : ""} ${process.description ? ` - ${process.description.split(" ")[0]}` : ""}`,
        };
      }) || [];
    return trains.filter(
      (train: IOptionType | undefined) => train !== undefined,
    ) as IOptionType[];
  }, [activeProcessesData]);

  const isCompletedButtonActive = useMemo(() => {
    const isEqualCount = data?.entries.length === data?.stages.length;
    const isAllCompleted = data?.stages.every(
      (stage: IStage) => getStatus(stage.status) === StatusEnums.completed,
    );
    return isEqualCount && isAllCompleted;
  }, [data]);

  return (
    <div
      className={`${styles["page-container"]} ${styles["active-process-detail"]}`}
    >
      <Topbar showCreateButton={true} />
      <ProgressionContainer
        data={data}
        isLoading={isLoading}
        isError={isError}
      />

      <InfoProcessContainer
        data={data}
        trainsOptions={trainsOptions}
        refetch={refetch}
        isCompletedButtonActive={isCompletedButtonActive ?? false}
      />
    </div>
  );
}
