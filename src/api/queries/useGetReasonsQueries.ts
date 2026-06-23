"use client";
import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { mockReasons, mockReasonsResponse } from "@/mock/managementData";
import { RootState } from "@/redux/store";
import {
  IReasonResponseDataTypes,
  IReasonType,
} from "@/types/reasonsTypes";

export const useGetReasonsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getReasonsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IReasonResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IReasonResponseDataTypes>(
      //   CLIENT_END_POINTS.reason.getAll,
      //   { type: ReasonQueryTypes.getAllReasons },
      // );
      // return data;
      return mockReasonsResponse;
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
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IReasonType>(
      //   CLIENT_END_POINTS.reason.getDetail,
      //   { type: ReasonQueryTypes.getDetailReason, id },
      // );
      // return data;
      return mockReasons.find((reason) => reason._id === id);
    },
  });
};
