"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IReasonsType, IReasonType } from "@/types/reasonsTypes";

export const useGetReasonsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getReasonsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IReasonsType> => {
      const { data } = await axiosInstance.post<IReasonsType>(
        CLIENT_END_POINTS.reason.getAll,
        { type: ReasonQueryTypes.getAllReasons },
      );
      return data;
    },
  });
};

export const useGetReasonDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getReasonDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<IReasonType | undefined> => {
      const { data } = await axiosInstance.post<IReasonType>(
        CLIENT_END_POINTS.reason.getDetail,
        { type: ReasonQueryTypes.getDetailReason, id },
      );
      return data;
    },
  });
};
