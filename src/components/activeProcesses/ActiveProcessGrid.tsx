"use client";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { useGetActiveProcessesDataQuery } from "@/api/queries/useGetProcessesQueries";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import styles from "@/styles/components/activeProcesses/ActiveProcessesGrid.module.scss";
import { IProcessesTypes, IProcessType } from "@/types/processTypes";

import { ActiveProcessCard } from "./ActiveProcessCard";

export const ActiveProcessGrid = ({
  setActiveUnit,
}: {
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading, isError } =
    useGetActiveProcessesDataQuery<IProcessesTypes>("ACTIVE");

  useEffect(() => {
    if (data) {
      setActiveUnit(data?.length.toString());
    }
  }, [setActiveUnit, data]);

  const t = useTranslations("activeProcess");

  return (
    <>
      <LoadingChecker isLoading={isLoading}>
        <ErrorChecker
          isError={isError || !data}
          noData={data && data.length < 1}
          noDataLabel={t("noDataLabel")}
        >
          <div className={styles["unit-grid"]}>
            {data &&
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
