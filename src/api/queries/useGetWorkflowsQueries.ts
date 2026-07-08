"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { optionsConverters } from "@/types/optionsConverter";

export const useGetWorkflowsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );
  return useQuery({
    queryKey: [`getWorkflowsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.workflow.getAll,
        { type: WorkflowQueryTypes.getAllWorkflows },
      );
      return data;
    },
  });
};

export const useGetWorkflowDetailDataQuery = <T>(id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getWorkflowDetail_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.workflow.getDetail,
        { type: WorkflowQueryTypes.getWorkflowDetail, id },
      );
      return data;
    },
  });
};

export const useGetWorkflowsOptionsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );
  return useQuery({
    queryKey: [`getWorkflowsOptionsDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.workflow.getAll,
        { type: WorkflowQueryTypes.getAllWorkflows },
      );
      return optionsConverters(data, "_id", "name") as unknown as T;
    },
  });
};
