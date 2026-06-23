"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";

export const useGetActiveProcessesDataQuery = <T>() => {
  return useQuery({
    queryKey: [`getActiveProcessAllDatas`],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getAllActive,
        {
          type: ProcessQueryTypes.getAllActiveProcess
        },
      );

      return data;
    },
  });
};

export const useActiveProcessDetailDataQuery = <T>() => {
  const params = useParams();
  const { id } = params;
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getActiveProcessDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getDetail,
        {
          type: ProcessQueryTypes.getDetailProcess,
          id,
        },
      );

      return data;
    },
  });
};
