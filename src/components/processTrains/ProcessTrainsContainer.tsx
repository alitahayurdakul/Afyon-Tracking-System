"use client";
import { useTranslations } from "next-intl";

import { useGetProcessTrainsDataQuery } from "@/api/useGetProcessTrains";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { URL_PAGES } from "@/consts/url";
import { useRouter } from "@/i18n/routing";
import { IProcessTrainSummary } from "@/types/processTrainTypes";

import { LoadingChecker } from "../common/loaders/LoadingChecker";
import SpinnerIcon from "../icons/SpinnerIcon";

import { TrainCard } from "./TrainCard";

import styles from "@/styles/components/processTrains/ProcessTrainContainer.module.scss";
import stylesPage from "@/styles/pages/PageCommonContainer.module.scss";

export const ProcessTrainsContainer = () => {
  const {
    data: trains,
    isLoading,
    isFetching,
    isError,
  } = useGetProcessTrainsDataQuery<IProcessTrainSummary[]>();
  const router = useRouter();
  const t = useTranslations("processTrains");
  const tErrors = useTranslations("layout.errors");

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
        <ErrorChecker
          isError={isError || !trains}
          errorLabel={tErrors("loadFailed")}
        >
          <div className={styles["train-grid"]}>
            {!!trains &&
              trains.map((train: IProcessTrainSummary) => (
                <TrainCard
                  key={train._id}
                  code={train._id.slice(-6).toUpperCase()}
                  name={train.trainSetNo}
                  wagonCount={train.wagons.length}
                  processCount={train.totalProcessCount}
                  activeProcessCount={train.activeProcessCount}
                  completedProcessCount={train.completedProcessCount}
                  description={train.desc ?? t("noDesc")}
                  isActive={train.activeProcessCount > 0}
                  onClick={() =>
                    router.push(`${URL_PAGES.processTrain}/${train._id}`)
                  }
                />
              ))}
          </div>
        </ErrorChecker>
      </LoadingChecker>
    </div>
  );
};
