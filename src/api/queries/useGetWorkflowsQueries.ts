"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";

export const useGetWorkflowsDataQuery = <T>() => {
  const trigger = useSelector((state: RootState) => state.tableTrigger.triggerTrainTableTrigger);
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

  return useQuery({
    queryKey: [`getWorkflowDetail_${id}`],
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
