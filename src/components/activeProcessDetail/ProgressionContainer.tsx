import { useTranslations } from "next-intl";

import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import { SkeletonContainer } from "@/components/common/loaders/SkeletonContainer";
import { ProcessResponse } from "@/types/processTypes";

import TrainVisualization from "../common/TrainVisualization";

import ProcessFlow from "./ProcessFlow";

import styles from "@/styles/components/activeProcessDetail/ProgressionContainer.module.scss";

interface IPropsTypes {
  data?: ProcessResponse;
  isLoading: boolean;
  isError: boolean;
}

export const ProgressionContainer = ({
  data,
  isLoading,
  isError,
}: IPropsTypes) => {
  const t = useTranslations("activeProcessDetail");
  const totalWagonCount = data?.process.totalWagonCount;
  const wagonOrder = data?.process.wagonOrder;

  return (
    <div className={styles["active-progression-body"]}>
      <div className={styles["header"]}>
        <div className={styles["title-row"]}>
          <h1 className={styles["title"]}>
            {isLoading ? (
              <SkeletonContainer />
            ) : (
              (data?.process?.locomotiveNo ?? "-")
            )}
          </h1>
          {!isLoading && data?.process?.workflowName ? (
            <span className={styles["process-pill"]}>
              {data?.process?.workflowName.toString() ?? "-"}
            </span>
          ) : null}
        </div>
        <p className={styles["subtitle"]}>
          {isLoading ? (
            <SkeletonContainer />
          ) : (
            <>
              {t("processId")}:{" "}
              <span className={styles["workflow-id"]}>
                {data?.process?._id ?? "-"}
              </span>
            </>
          )}
        </p>
      </div>
      {!isError &&
        !isLoading &&
        totalWagonCount &&
        wagonOrder &&
        totalWagonCount >= 2 &&
        wagonOrder <= totalWagonCount && (
          <TrainVisualization
            totalCount={totalWagonCount}
            highlightedWagonNumber={wagonOrder}
          />
        )}

      <LoadingChecker isLoading={isLoading}>
        <ErrorChecker
          isError={isError || !data}
          noData={!!data && data?.entries.length < 1}
          noDataLabel={t("no-data-label")}
        >
          <ProcessFlow data={data} />
        </ErrorChecker>
      </LoadingChecker>
    </div>
  );
};
