"use client";
import { useQuery } from "@tanstack/react-query";

// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  ISubStageResponseDataTypes,
  ISubStageType,
} from "@/types/subStagesTypes";
import { mockSubStages, mockSubStagesResponse } from "@/mock/managementData";

export const useGetSubStagesListDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getSubStagesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<ISubStageResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<ISubStageResponseDataTypes>(
      //   CLIENT_END_POINTS.subStage.getAll,
      //   { type: SubStageQueryTypes.getAllSubStages },
      // );
      // return data;
      return mockSubStagesResponse;
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
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<ISubStageType>(
      //   CLIENT_END_POINTS.subStage.getDetail,
      //   { type: SubStageQueryTypes.getDetailSubStage, id },
      // );
      // return data;
      return mockSubStages.find((subStage) => subStage._id === id);
    },
  });
};
