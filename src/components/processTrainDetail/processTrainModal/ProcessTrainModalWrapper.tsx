import React from "react";
import { useTranslations } from "next-intl";

import { useGetTrainWagonProcessesDetailDataQuery } from "@/api/useGetProcessTrains";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { ProcessArrayResponse, ProcessResponse } from "@/types/processTypes";

import { ProcessTrainModalProcessDetail } from "./ProcessTrainModalProcessDetail";

const ProcessTrainModalWrapper = ({
  wagonParamId,
}: {
  wagonParamId?: string;
}) => {
  const t = useTranslations("processTrainDetail");
  const {
    data: processInfos,
    isLoading,
    isFetching,
    isError,
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
        <ErrorChecker
          isError={isError || !processInfos}
          noData={!!processInfos && processInfos?.length < 1}
          noDataLabel={t("modal.no-data-label")}
        >
          {processInfos?.map((process: ProcessResponse, index: number) => (
            <React.Fragment key={index}>
              <ProcessTrainModalProcessDetail processInfo={process} />
            </React.Fragment>
          ))}
        </ErrorChecker>
      </LoadingChecker>
    </div>
  );
};

export default ProcessTrainModalWrapper;
