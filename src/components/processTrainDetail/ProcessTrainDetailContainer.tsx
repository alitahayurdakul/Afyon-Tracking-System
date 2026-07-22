"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  useGetTrainDetailDataQuery,
} from "@/api/useGetProcessTrains";
import { PROCESS_TRAIN_WAGONS_DETAIL_MODAL } from "@/consts/modals";
import { IWagonDetail } from "@/types/trainsTypes";
import { useAddQueryParam } from "@/utils/searchParams";

import { LoadingChecker } from "../common/loaders/LoadingChecker";
import { NewModal } from "../common/NewModal";
import TrainVisualization from "../common/TrainVisualization";
import SpinnerIcon from "../icons/SpinnerIcon";

import { ProcessTableListBody } from "./processTable/ProcessTableListBody";
import ProcessTrainModalWrapper from "./processTrainModal/ProcessTrainModalWrapper";
import TrainDetailSection from "./TrainDetailSection";

import styles from "@/styles/components/processTrainDetail/ProcessTrainDetailContainer.module.scss";
import stylesPage from "@/styles/pages/PageCommonContainer.module.scss";

export const ProcessTrainDetailContainer = () => {
  const {
    data: trainInfos,
    isLoading,
    isFetching,
  } = useGetTrainDetailDataQuery();
  const t = useTranslations("processTrainDetail");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalParam = searchParams?.get("modal");
  const wagonParamId = modalParam?.split("_").at(-1);
  

  const isMemberWagon =
    !!trainInfos && trainInfos?.wagons
      ? trainInfos?.wagons.find(
          (wagon: IWagonDetail) => wagon._id === wagonParamId,
        )
      : false;

  const isOpen =
    !!isMemberWagon && !!modalParam
      ? modalParam.split("_").slice(0, -1).join("_") ===
        PROCESS_TRAIN_WAGONS_DETAIL_MODAL
      : false;

  const onHandleWagonClick = (wagonOrder?: number) => {
    if (trainInfos && trainInfos.wagons && wagonOrder) {
      const wagonInfos = trainInfos?.wagons.find(
        (wagon: IWagonDetail) => wagon.order === wagonOrder,
      );
      const wagonId = wagonInfos?._id ?? "";
      !!wagonId &&
        addQueryParam(
          "modal",
          `${PROCESS_TRAIN_WAGONS_DETAIL_MODAL}_${wagonId}`,
        );
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
        {isOpen && (
          <NewModal
            ignoreName
            width={"900px"}
            height={"auto"}
            title={t("modal.title")}
            isCloseOutside={false}
            isCloseEsc={false}
          >
            <ProcessTrainModalWrapper wagonParamId={wagonParamId} />
          </NewModal>
        )}
      </LoadingChecker>
    </div>
  );
};
