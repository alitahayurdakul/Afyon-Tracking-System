

import { useTranslations } from "next-intl";

import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import { SkeletonContainer } from "@/components/common/loaders/SkeletonContainer";
import styles from "@/styles/components/activeProcessDetail/ProgressionContainer.module.scss";
import { ProcessResponse } from "@/types/processTypes";

import ProcessFlow from "./ProcessFlow";

interface IPropsTypes {
  data?: ProcessResponse,
  isLoading: boolean;
  isError: boolean;
}

export const ProgressionContainer = ({ data, isLoading, isError }: IPropsTypes) => {
  const t = useTranslations("activeProcessDetail");

  return (
    <div className={styles["active-progression-body"]}>
      <div className={styles["header"]}>
        <div className={styles["title-row"]}>
          <h1 className={styles["title"]}>
            {isLoading ? <SkeletonContainer /> : data?.process?.locomotiveNo ?? "-"}
          </h1>
          {!isLoading && data?.process?.workflowName ? (
            <span className={styles["process-pill"]}>
              {String(data?.process?.workflowName)}
            </span>
          ) : null}
        </div>
        <p className={styles["subtitle"]}>
          {isLoading ? (
            <SkeletonContainer />
          ) : (
            <>{t("processId")}: <span className={styles["workflow-id"]}>{data?.process?._id ?? "-"}</span></>
          )}
        </p>
      </div>
      <LoadingChecker isLoading={isLoading} >
        <ErrorChecker isError={isError || !data} noData={data && data?.entries.length < 1} noDataLabel="Aktif süreç detayı bulunmamaktadır.">
            <ProcessFlow />
        </ErrorChecker>
      </LoadingChecker>
    </div>
  );
};

