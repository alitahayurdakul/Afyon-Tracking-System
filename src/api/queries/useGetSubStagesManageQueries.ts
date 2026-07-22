"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IOptionType } from "@/types/formTypes";
import { optionsConverters } from "@/types/optionsConverter";
import { ISubStageType } from "@/types/subStagesTypes";

export const useGetSubStagesListDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getSubStagesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<ISubStageType[]> => {
      const { data } = await axiosInstance.post<ISubStageType[]>(
        CLIENT_END_POINTS.subStage.getAll,
        { type: SubStageQueryTypes.getAllSubStages },
      );
      return data;
    },
  });
};

export const useGetSubStageDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getSubStageDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<ISubStageType | undefined> => {
      const { data } = await axiosInstance.post<ISubStageType>(
        CLIENT_END_POINTS.subStage.getDetail,
        { type: SubStageQueryTypes.getDetailSubStage, id },
      );
      return data;
    },
  });
};

export const useGetSubStagesOptionsListDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getSubStagesOptionsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<ISubStageType[]>(
        CLIENT_END_POINTS.subStage.getAll,
        { type: SubStageQueryTypes.getAllSubStages },
      );
      return optionsConverters(data, "_id", "name") as T;
    },
  });
};