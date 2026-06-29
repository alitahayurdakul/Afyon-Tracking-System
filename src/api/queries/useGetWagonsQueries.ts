"use client";
import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { WagonQueryTypes } from "@/app/api/wagons/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { mockWagons, mockWagonsResponse } from "@/mock/managementData";
import { RootState } from "@/redux/store";
import {
  IWagonResponseDataTypes,
  IWagonType,
} from "@/types/wagonsTypes";

export const useGetWagonsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getWagonsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IWagonResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IWagonResponseDataTypes>(
      //   CLIENT_END_POINTS.wagon.getAll,
      //   { type: WagonQueryTypes.getAllWagons },
      // );
      // return data;
      return mockWagonsResponse;
    },
  });
};

export const useGetWagonDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getWagonDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<IWagonType | undefined> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IWagonType>(
      //   CLIENT_END_POINTS.wagon.getDetail,
      //   { type: WagonQueryTypes.getDetailWagon, id },
      // );
      // return data;
      return mockWagons.find((wagon) => wagon._id === id);
    },
  });
};
