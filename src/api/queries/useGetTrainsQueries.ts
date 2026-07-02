"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { optionsConverters } from "@/types/optionsConverter";
import {
  ITrainsType,
  ITrainType,
} from "@/types/trainsTypes";

export const useGetTrainsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
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

export const useGetTrainDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getTrainDetailDatas_${id}`],
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

  return useQuery({
    queryKey: [`getTrainDetailWagonsDatas_${id}`],
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
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
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