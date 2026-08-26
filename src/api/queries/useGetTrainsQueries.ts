"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { optionsConverters } from "@/types/optionsConverter";
import { ITrainsResponseDataTypes, ITrainsType, ITrainType } from "@/types/trainsTypes";

export const useGetTrainsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.trains,
  );

  return useQuery({
    queryKey: [`getTrainsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainsType>(
        CLIENT_END_POINTS.train.getAll,
        {
          type: TrainQueryTypes.getAllTrains,
        },
      );
      return data;
    },
  });
};

export const useGetTableTrainsDataQuery = ({
  currentPage,
  pageSize,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.trains,
  );

  return useQuery({
    queryKey: [
      `getTableTrainsAllDatas`,
      trigger,
      currentPage,
      pageSize,
      search,
    ],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainsResponseDataTypes>(
        CLIENT_END_POINTS.train.getAll,
        {
          type: TrainQueryTypes.getTableTrain,
          pageSize,
          currentPage,
          search,
        },
      );
      return data;
    },
  });
};

export const useGetTrainDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.trains,
  );

  return useQuery({
    queryKey: [`getTrainDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainType>(
        CLIENT_END_POINTS.train.getDetail,
        {
          type: TrainQueryTypes.getDetailTrain,
          id,
        },
      );

      return data;
    },
  });
};

export const useGetTrainDetailWagonsDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  // Was the only hook in this file without the trigger in its key, so the
  // wagon list inside the edit modal never refreshed after a mutation.
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.trains,
  );

  return useQuery({
    queryKey: [`getTrainDetailWagonsDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainType>(
        CLIENT_END_POINTS.train.getDetail,
        {
          type: TrainQueryTypes.getDetailTrain,
          id,
        },
      );
      const wagonsData = optionsConverters(data?.wagons, "_id", "name");
      return wagonsData;
    },
  });
};

export const useGetTrainOptionsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.trains,
  );

  return useQuery({
    queryKey: [`useGetTrainOptionsDataQuery`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainsType>(
        CLIENT_END_POINTS.train.getAll,
        {
          type: TrainQueryTypes.getAllTrains,
        },
      );
      const trainOptions = optionsConverters(data, "_id", "trainSetNo");
      return trainOptions;
    },
  });
};
