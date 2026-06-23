"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

import {
  useActiveProcessDetailDataQuery,
  useGetActiveProcessesDataQuery,
} from "@/api/queries/useGetProcessesQueries";
import InfoProcessContainer from "@/components/activeProcessDetail/InfoProcessContainer";
import { ProgressionContainer } from "@/components/activeProcessDetail/ProgressionContainer";
import Breadcrumb from "@/components/Breadcrumb";
import { Topbar } from "@/components/common/Topbar";
import { URL_PAGES } from "@/consts/url";
import styles from "@/styles/pages/PageCommonContainer.module.scss";
import { IOptionType } from "@/types/formTypes";
import {
  IActiveProcessesTypes,
  IActiveProcessType,
  ProcessResponse,
} from "@/types/processTypes";

export default function ActiveProcessDetailPage() {
  const id = useParams().id;

  const { data, isLoading, isError, refetch } =
    useActiveProcessDetailDataQuery<ProcessResponse>();

  const { data: allFleetsData } =
    useGetActiveProcessesDataQuery<IActiveProcessesTypes>();

  const trainsOptions = useMemo(() => {
    const trains =
      allFleetsData?.map((fleet: IActiveProcessType) => {
        return {
          value: fleet._id,
          label: fleet.locomotiveNo,
        };
      }) || [];
    return trains.filter(
      (train: IOptionType | undefined) => train !== undefined,
    ) as IOptionType[];
  }, [allFleetsData]);

  return (
    <div className={styles["active-processes-page"]}>
      <Topbar showCreateButton={true} />
      <Breadcrumb data={[
        { name: "Depo Gösterge Paneli", link: URL_PAGES.activeProcesses },
        { name: `Aktif Süreç Detayı - ${id ?? "-"}` },
      ]}/>
      <ProgressionContainer
        data={data}
        isLoading={isLoading}
        isError={isError}
      />

      <InfoProcessContainer
        data={data}
        trainsOptions={trainsOptions}
        refetch={refetch}
      />
    </div>
  );
}
