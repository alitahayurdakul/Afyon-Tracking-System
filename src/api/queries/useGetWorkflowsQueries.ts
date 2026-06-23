"use client";
import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { mockWorkflows } from "@/mock/managementData";
import { RootState } from "@/redux/store";

export const useGetWorkflowsDataQuery = <T>() => {
  const trigger = useSelector((state: RootState) => state.tableTrigger.triggerTrainTableTrigger);
  return useQuery({
    queryKey: [`getWorkflowsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<T>(
      //   CLIENT_END_POINTS.workflow.getAll,
      //   { type: WorkflowQueryTypes.getAllWorkflows },
      // );
      // return data;
      return mockWorkflows as T;
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
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<T>(
      //   CLIENT_END_POINTS.workflow.getDetail,
      //   { type: WorkflowQueryTypes.getWorkflowDetail, id },
      // );
      // return data;
      return mockWorkflows.find((workflow) => workflow._id === id) as T;
    },
  });
};
