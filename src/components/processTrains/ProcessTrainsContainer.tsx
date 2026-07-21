"use client";
import { useTranslations } from "next-intl";

import { useGetProcessTrainsDataQuery } from "@/api/useGetProcessTrains";
import styles from "@/styles/components/processTrainDetail/ProcessTrainDetailContainer.module.scss";
import stylesPage from "@/styles/pages/PageCommonContainer.module.scss";
import { IProcessTrainSummary } from "@/types/processTrainTypes";

import { LoadingChecker } from "../common/loaders/LoadingChecker";
import SpinnerIcon from "../icons/SpinnerIcon";

export const ProcessTrainsContainer = () => {
  const {
    data: trains,
    isLoading,
    isFetching,
  } = useGetProcessTrainsDataQuery<IProcessTrainSummary[]>();
  const t = useTranslations("processTrains");

  return (
    <div className={stylesPage["page-container"]}>
      <div className={styles["title"]}>
        <h2>{t("title")}</h2>
        <p>{t("summary")}</p>
      </div>
      <LoadingChecker
        isLoading={isLoading || isFetching}
        icon={
          <div style={{ textAlign: "center" }}>
            <SpinnerIcon color={"var(--blue-90)"} />{" "}
          </div>
        }
      >

      </LoadingChecker>
    </div>
  );
};
