"use client";
import { useQuery } from "@tanstack/react-query";

// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { StageQueryTypes } from "@/app/api/stages/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { mockStages, mockStagesResponse } from "@/mock/managementData";

export const useGetStagesDataQuery = <T>() => {
  const trigger = useSelector((state: RootState) => state.tableTrigger.triggerTrainTableTrigger);
  return useQuery({
    queryKey: [`getStagesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<T>(
      //   CLIENT_END_POINTS.stage.getAll,
      //   { type: StageQueryTypes.getAllStages },
      // );
      // return data;
      return mockStagesResponse as T;
    },
  });
};

export const useGetStageDetailDataQuery = <T>(id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getStagesDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<T> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<T>(
      //   CLIENT_END_POINTS.stage.getDetail,
      //   { type: StageQueryTypes.getDetailStage, id },
      // );
      // return data;
      return mockStages.find((stage) => stage._id === id) as T;
    },
  });
};
