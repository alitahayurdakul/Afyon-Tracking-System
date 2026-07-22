import React from "react";

import { useGetTrainWagonProcessesDetailDataQuery } from "@/api/useGetProcessTrains";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { ProcessArrayResponse, ProcessResponse } from "@/types/processTypes";

import { ProcessTrainModalProcessDetail } from "./ProcessTrainModalProcessDetail";

const ProcessTrainModalWrapper = ({
  wagonParamId,
}: {
  wagonParamId?: string;
}) => {
  const {
    data: processInfos,
    isLoading,
    isFetching,
  } = useGetTrainWagonProcessesDetailDataQuery<ProcessArrayResponse>(
    wagonParamId,
  );
  return (
    <div>
      <LoadingChecker
        isLoading={isLoading || isFetching}
        icon={
          <div style={{ textAlign: "center" }}>
            <SpinnerIcon color={"var(--blue-90)"} />{" "}
          </div>
        }
      >
        {!!processInfos &&
          processInfos.map((process: ProcessResponse, index: number) => (
            <React.Fragment key={index}>
              <ProcessTrainModalProcessDetail processInfo={process} />
            </React.Fragment>
          ))}
      </LoadingChecker>
    </div>
  );
};

export default ProcessTrainModalWrapper;
