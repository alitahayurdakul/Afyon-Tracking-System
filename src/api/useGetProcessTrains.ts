"use client";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessTrainsQueryTypes } from "@/app/api/processTrains/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";

export const useGetProcessTrainsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
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