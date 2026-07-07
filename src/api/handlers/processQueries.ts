/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const processHandlers = {
  createProcess,
  deleteProcess,
  editProcess,
  getActiveProcesses,
  getProcessDetail,
  editProcessDelayReasons,
  getStageDetail,
  startSubStage,
  saveSubStage,
};

async function createProcess(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.process.start, {
      ...params,
    });

    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create a process", 200);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteProcess(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.process.delete(id),
      );
      if (response.status === 200) {
        return createJsonSuccess(response.data, 200);
      }
    }
    return createJsonError("Failed to delete a process", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editProcess(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.process.edit(id), {
      ...rest,
    });
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to edit a process", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getActiveProcesses(
  params: Record<string, any>,
): Promise<Response> {
  try {
    const { status, projectId } = params || {};
    const response = await axiosInstance.get(
      END_POINTS.process.getAll({ status, projectId }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get all active processes", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getProcessDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get(END_POINTS.process.getDetail(id));
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get process detail", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editProcessDelayReasons(
  params: Record<string, any>,
): Promise<Response> {
  try {
    const response = await axiosInstance.patch(
      END_POINTS.process.editDelayReasons(params.entryStageId),
      {
        delayReasonIds: params.delayReasonIds,
        delayNote: "",
      },
    );
    if (response.status === 200) {
      return Response.json({ success: true });
    }
    return Response.json(
      { success: false, error: "Failed to edit process delay reasons" },
      { status: 400 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getStageDetail(
  processId: string,
  stageId: string,
): Promise<Response> {
  try {
    const response = await axiosInstance.get(
      END_POINTS.process.stageDetail(processId || "", stageId || ""),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.subStages);
    }

    return createJsonError("Failed to get process detail", 400);
  } catch (err: any) {
    console.log("errr", err);
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function startSubStage(params: Record<string, any>): Promise<Response> {
  try {
    const { processId, stageId, subStageId } = params;
    const response = await axiosInstance.put(
      END_POINTS.process.startSaveSubStage(processId, stageId, subStageId),
    );

    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to start a sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function saveSubStage(params: Record<string, any>): Promise<Response> {
  try {
    const { processId, stageId, subStageId, data } = params;
    console.log("ddd", data);

    const response = await axiosInstance.put(
      END_POINTS.process.startSaveSubStage(processId, stageId, subStageId),
      { ...data },
    );

    if (response.status === 200) {
      return createJsonSuccess(200);
    }

    return createJsonError("Failed to start a sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
