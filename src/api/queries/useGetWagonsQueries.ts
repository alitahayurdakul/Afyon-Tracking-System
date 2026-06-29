"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { WagonQueryTypes } from "@/app/api/wagons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IWagonsType, IWagonType } from "@/types/wagonsTypes";

export const useGetWagonsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getWagonsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IWagonsType> => {
      const { data } = await axiosInstance.post<IWagonsType>(
        CLIENT_END_POINTS.wagon.getAll,
        { type: WagonQueryTypes.getAllWagons },
      );
      return data;
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
      const { data } = await axiosInstance.post<IWagonType>(
        CLIENT_END_POINTS.wagon.getDetail,
        { type: WagonQueryTypes.getDetailWagon, id },
      );
      return data;
    },
  });
};
