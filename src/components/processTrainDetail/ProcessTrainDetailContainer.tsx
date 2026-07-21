"use client";
import { useTranslations } from "next-intl";

import { useGetTrainDetailDataQuery } from "@/api/useGetProcessTrains";
import styles from "@/styles/components/processTrainDetail/ProcessTrainDetailContainer.module.scss";
import stylesPage from "@/styles/pages/PageCommonContainer.module.scss";
import { IWagonDetail } from "@/types/trainsTypes";

import { LoadingChecker } from "../common/loaders/LoadingChecker";
import TrainVisualization from "../common/TrainVisualization";
import SpinnerIcon from "../icons/SpinnerIcon";
import { ProcessTableListBody } from "./processTable/ProcessTableListBody";
import TrainDetailSection from "./TrainDetailSection";

export const ProcessTrainDetailContainer = () => {
  const {
    data: trainInfos,
    isLoading,
    isFetching,
  } = useGetTrainDetailDataQuery();
  const t = useTranslations("processTrainDetail");

  const onHandleWagonClick = (wagonOrder?: number) => {
    if (trainInfos && trainInfos.wagons && wagonOrder) {
      const wagonInfos =
        trainInfos?.wagons.find(
          (wagon: IWagonDetail) => wagon.order === wagonOrder,
        ) ?? {};
    }
  };

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
        <div className={styles["top-container"]}>
          <TrainDetailSection trainSet={trainInfos} />
          <TrainVisualization
            totalCount={trainInfos?.wagons?.length ?? 0}
            className={styles["train-visualization-container"]}
            onClickWagon={(wagonOrder?: number) =>
              onHandleWagonClick(wagonOrder)
            }
          />
        </div>

        <ProcessTableListBody />
      </LoadingChecker>
    </div>
  );
};
