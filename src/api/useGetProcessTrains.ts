"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessTrainsQueryTypes } from "@/app/api/processTrains/route";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { ITrainType } from "@/types/trainsTypes";

export const useGetProcessTrainsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.processTrains,
  );

  return useQuery({
    queryKey: [`getProcessTrainsDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processTrains.getAll,
        {
          type: ProcessTrainsQueryTypes.getProcessTrains,
        },
      );
      return data;
    },
  });
};

export const useGetProcessTrainDetailDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.processTrains,
  );
  const trainId = useParams().trainId;

  return useQuery({
    queryKey: [`getProcessTrainDetailDatas`, trigger, trainId],
    refetchOnWindowFocus: false,
    enabled: !!trainId,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processTrains.getByTrain,
        {
          type: ProcessTrainsQueryTypes.getProcessTrainDetail,
          params: {
            trainId: typeof trainId === "string" ? trainId : trainId?.[0],
          },
        },
      );
      return data;
    },
  });
};

export const useGetTrainWagonProcessesDetailDataQuery = <T>(
  wagonId?: string,
) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.processTrains,
  );
  const trainId = useParams().trainId;

  return useQuery({
    queryKey: [`getProcessTrainDetailDatas`, trigger, trainId, wagonId],
    refetchOnWindowFocus: false,
    enabled: !!trainId,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processTrains.getByTrainAndWagon,
        {
          type: ProcessTrainsQueryTypes.getByTrainAndWagonProcesses,
          params: {
            trainId: typeof trainId === "string" ? trainId : trainId?.[0],
            ...(wagonId && { wagonId }),
          },
        },
      );
      return data;
    },
  });
};

export const useGetTrainDetailDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.processTrains,
  );
  const trainId = useParams().trainId;

  return useQuery({
    queryKey: [`getTrainDetailDatas_${trainId}`, trigger, trainId],
    refetchOnWindowFocus: false,
    enabled: !!trainId,
    queryFn: async () => {
      const { data } = await axiosInstance.post<ITrainType>(
        CLIENT_END_POINTS.train.getDetail,
        {
          type: TrainQueryTypes.getDetailTrain,
          id: typeof trainId === "string" ? trainId : trainId?.[0],
        },
      );

      return data;
    },
  });
};
