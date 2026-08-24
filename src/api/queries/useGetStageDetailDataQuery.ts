import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { RootState } from "@/redux/store";
import { extractApiError } from "@/utils/extractApiError";

import { axiosInstance } from "../axiosInstance";

export const useGetStageDetailDataQuery = <T>(stageId: string) => {
  const isEnabled = Boolean(stageId && stageId !== "");
  const { id: processId } = useParams();

  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.processes,
  );

  return useQuery({
    queryKey: [`getProcessStageDetail_${stageId}`, trigger],
    refetchOnWindowFocus: false,
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getProcessStageDetail,
        {
          type: ProcessQueryTypes.getStageDetail,
          processId,
          stageId,
        },
      );

      return data;
    },
  });
};

interface StartSubStage {
  processId: string;
  stageId: string;
  subStageId: string;
}

const startSubStage = async (payload: StartSubStage): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.startSubStage,
    {
      params: payload,
      type: ProcessQueryTypes.startSubStage,
    },
  );
  return data;
};

export const useStartSubStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  return useMutation({
    mutationFn: startSubStage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["startSubStage", variables.processId, variables.subStageId],
      });
      dispatch(
        addToastify({
          message: t("notifications.start.success"),
          type: "success",
          icon: "close",
          id: "startSubStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.start.error"),
          type: "error",
          icon: "close",
          id: "startSubStageError" + Date.now(),
        }),
      );
    },
  });
};

interface SaveSubStage {
  processId: string;
  stageId: string;
  subStageId: string;
  data: {
    status: string;
    description: string;
    delayReasons: {
      reasonId: string;
      name?: string;
    }[];
    materials: {
      materialId: string;
      serialNumber: string;
    }[];
  };
}

const saveSubStage = async (payload: SaveSubStage): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.saveandCompleteSubStage,
    {
      params: payload,
      type: ProcessQueryTypes.saveandCompleteSubStage,
    },
  );
  return data;
};

export const useSaveSubStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  return useMutation({
    mutationFn: saveSubStage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["saveSubStage", variables.processId, variables.subStageId],
      });
      dispatch(
        addToastify({
          message: t("notifications.save.success"),
          type: "success",
          icon: "close",
          id: "saveSubStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.save.error"),
          type: "error",
          icon: "close",
          id: "saveSubStageError" + Date.now(),
        }),
      );
    },
  });
};

// COMPLETE SUB STAGE
interface completeSubStage {
  processId: string;
  stageId: string;
  subStageId: string;
  data: {
    status: string;
    description: string;
    delayReasons: {
      reasonId: string;
      name?: string;
    }[];
    materials: {
      materialId: string;
      serialNumber: string;
    }[];
  };
}

const completeSubStage = async (payload: completeSubStage): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.saveandCompleteSubStage,
    {
      params: payload,
      type: ProcessQueryTypes.saveandCompleteSubStage,
    },
  );
  return data;
};

export const useCompleteSubStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  return useMutation({
    mutationFn: completeSubStage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["completeSubStage", variables.processId, variables.subStageId],
      });
      dispatch(
        addToastify({
          message: t("notifications.complete.success"),
          type: "success",
          icon: "close",
          id: "completeSubStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.complete.error"),
          type: "error",
          icon: "close",
          id: "completeSubStageError" + Date.now(),
        }),
      );
    },
  });
};

// Edited completed sub stage
interface EditSubStage {
  processId: string;
  stageId: string;
  subStageId: string;
  data: {
    status: string;
  };
}

const editSubStage = async (payload: EditSubStage): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.saveandCompleteSubStage,
    {
      params: payload,
      type: ProcessQueryTypes.saveandCompleteSubStage,
    },
  );
  return data;
};

export const useEditSubStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  return useMutation({
    mutationFn: editSubStage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["editSubStage", variables.processId, variables.subStageId],
      });
      dispatch(
        addToastify({
          message: t("notifications.edit.success"),
          type: "success",
          icon: "close",
          id: "editSubStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.complete.error"),
          type: "error",
          icon: "close",
          id: "completeSubStageError" + Date.now(),
        }),
      );
    },
  });
};

interface CompleteStage {
  entryId: string;
}

const completeStage = async (payload: CompleteStage): Promise<any> => {
  const { data } = await axiosInstance.post<any>(
    CLIENT_END_POINTS.processes.completeStage,
    {
      entryId: payload.entryId,
      type: ProcessQueryTypes.completeStage,
    },
  );
  return data;
};

export const useCompleteStage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  return useMutation({
    mutationFn: completeStage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["completeStage", variables.entryId],
      });
      dispatch(
        addToastify({
          message: t("notifications.complete-parent-stage.success"),
          type: "success",
          icon: "close",
          id: "completeStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("processes"));
    },
    onError: (err) => {
      dispatch(
        addToastify({
          message: extractApiError(err, "notifications.complete-parent-stage.error"),
          type: "error",
          icon: "close",
          id: "completeStageError" + Date.now(),
        }),
      );
    },
  });
};