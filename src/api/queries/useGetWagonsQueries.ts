"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { WagonQueryTypes } from "@/app/api/wagons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IOptionType } from "@/types/formTypes";
import { optionsConverters } from "@/types/optionsConverter";
import { IWagonsType, IWagonType } from "@/types/wagonsTypes";

export const useGetWagonsDataQuery = () => {
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
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getWagonDetailDatas_${id}`, trigger],
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

export const useGetWagonsOptionsQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getWagonsAllOptions`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IOptionType[]> => {
      const { data } = await axiosInstance.post<IWagonsType>(
        CLIENT_END_POINTS.wagon.getAll,
        { type: WagonQueryTypes.getAllWagons },
      );
      const options = optionsConverters(data, "_id", "wagonNo");
      return options;
    },
  });
};
