"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { StageQueryTypes } from "@/app/api/stages/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";

export const useGetStagesDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );
  return useQuery({
    queryKey: [`getStagesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.stage.getAll,
        { type: StageQueryTypes.getAllStages },
      );
      return data;
    },
  });
};

export const useGetStageDetailDataQuery = <T>(id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getStagesDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.stage.getDetail,
        { type: StageQueryTypes.getDetailStage, id },
      );
      return data;
    },
  });
};
