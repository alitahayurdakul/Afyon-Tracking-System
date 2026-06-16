"use client";
import styles from "@/styles/components/activeProcesses/ActiveProcessesGrid.module.scss";
import React from "react";
import { ActiveProcessCard } from "./ActiveProcessCard";
import { useGetActiveProcessesDataQuery } from "@/api/queries/useGetProcessesQueries";
import {
  IActiveProcessesTypes,
  IActiveProcessType,
} from "@/types/processTypes";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";

export const ActiveProcessGrid = () => {
  const { data, isLoading, isError } =
    useGetActiveProcessesDataQuery<IActiveProcessesTypes>();

  return (<>
      <LoadingChecker isLoading={isLoading}>
        <ErrorChecker isError={isError || !data} noData={data && data.length < 1} noDataLabel="Aktif süreç bulunmamaktadır.">
          <div className={styles["unit-grid"]}>{data &&
            data.length > 0 &&
            data?.map((unit: IActiveProcessType, index: number) => (
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