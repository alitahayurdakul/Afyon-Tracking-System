"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { RootState } from "@/redux/store";
import { extractApiError } from "@/utils/extractApiError";

export const useGetActiveProcessesDataQuery = <T>(status?: string) => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getActiveProcessAllDatas`, status, projectId, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getAllActive,
        {
          type: ProcessQueryTypes.getAllActiveProcess,
          params: {
            status,
            projectId,
          },
        },
      );

      return data;
    },
  });
};

export const useActiveProcessDetailDataQuery = <T>(processId?: string) => {
  const params = useParams();
  const { id } = params;
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );
  const pathname = usePathname();

  return useQuery({
    queryKey: [
      `getActiveProcessDetailDatas`,
      pathname,
      processId ?? id,
      trigger,
    ],
    refetchOnWindowFocus: false,
    enabled: !!processId || !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getDetail,
        {
          type: ProcessQueryTypes.getDetailProcess,
          id: processId ?? id,
        },
      );

      return data;
    },
  });
};

// Start Stage
interface StartStagePayload {
  stageId: string;
  operator: string;
}

interface StartStageRequest extends StartStagePayload {
  processId: string;
}

const startStage = async (payload: StartStageRequest): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.startStage,
    {
      type: ProcessQueryTypes.startStage,
      params: {
        processId: payload.processId ?? "",
        stageId: payload.stageId,
        operator: payload.operator,
      },
    },
  );
  return data;
};

export const useStartStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");
  const params = useParams();
  const { id } = params;
  const processId = typeof id === "string" ? id : id?.[0];

  return useMutation({
    mutationFn: (payload: StartStagePayload) =>
      startStage({ ...payload, processId: processId ?? "" }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["startStage", variables.stageId, id],
      });
      dispatch(
        addToastify({
          message: t("notifications.start-stage.success"),
          type: "success",
          icon: "close",
          id: "startStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.start-stage.error"),
          type: "error",
          icon: "close",
          id: "startStageError" + Date.now(),
        }),
      );
    },
  });
};
