"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { WagonQueryTypes } from "@/app/api/wagons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { IOptionType } from "@/types/formTypes";
import { optionsConverters } from "@/types/optionsConverter";
import {
  IWagonsType,
  IWagonTableResponseDataTypes,
  IWagonType,
} from "@/types/wagonsTypes";

export const useGetWagonsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.wagons,
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

export const useGetTableWagonsDataQuery = ({
  pageSize,
  currentPage,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.wagons,
  );

  return useQuery({
    queryKey: [
      `getTableWagonsAllDatas`,
      trigger,
      pageSize,
      currentPage,
      search,
    ],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<IWagonTableResponseDataTypes> => {
      const { data } = await axiosInstance.post<IWagonTableResponseDataTypes>(
        CLIENT_END_POINTS.wagon.getAll,
        { type: WagonQueryTypes.getTableWagons, pageSize, currentPage, search },
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
    (state: RootState) => state.tableTrigger.wagons,
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
    (state: RootState) => state.tableTrigger.wagons,
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
