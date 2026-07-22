"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

import { useGetActiveProcessesDataQuery } from "@/api/queries/useGetProcessesQueries";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import { IProcessesTypes, IProcessType } from "@/types/processTypes";
import { ResponseStatusEnums } from "@/utils/enum/commonEnums";

import SpinnerIcon from "../icons/SpinnerIcon";

import { ActiveProcessCard } from "./ActiveProcessCard";

import styles from "@/styles/components/activeProcesses/ActiveProcessesGrid.module.scss";

export const ActiveProcessGrid = ({
  setActiveUnit,
}: {
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading, isError } =
    useGetActiveProcessesDataQuery<IProcessesTypes>(ResponseStatusEnums.active);

  useEffect(() => {
    if (data) {
      setActiveUnit(data?.length?.toString());
    }
  }, [setActiveUnit, data]);

  const t = useTranslations("activeProcess");

  return (
    <>
      <LoadingChecker
        isLoading={isLoading}
        icon={<SpinnerIcon color={"var(--blue-90)"} />}
      >
        <ErrorChecker
          isError={isError || !data}
          noData={!!data && data.length < 1}
          noDataLabel={t("noDataLabel")}
        >
          <div className={styles["unit-grid"]}>
            {!!data &&
              data.length > 0 &&
              data?.map((unit: IProcessType, index: number) => (
                <React.Fragment key={index}>
                  <ActiveProcessCard unit={unit} />
                </React.Fragment>
              ))}
          </div>
        </ErrorChecker>
      </LoadingChecker>
    </>
  );
};
