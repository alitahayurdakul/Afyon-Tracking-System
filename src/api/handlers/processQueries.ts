/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { createJsonError, createJsonOnlyData, createJsonSuccess, extractErrorMessage } from "./responseHelpers";

export const processHandlers = {
  createProcess,
  deleteProcess,
  editProcess,
  getActiveProcesses,
  getProcessDetail,
  getAllProcesses,
  editProcessDelayReasons
};

async function createProcess(
  params: Record<string, any>,
): Promise<Response> {
  try {
    const { processId, ...rest } = params;
    const response = await axiosInstance.post(
      END_POINTS.process.create(processId || ""),
      {
        ...rest
      },
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create a process", 400);
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

async function editProcess(
  params: Record<string, any>,
): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(
      END_POINTS.process.edit(id),
      {
        ...rest,
      },
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to edit a process", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getAllProcesses(): Promise<Response> {
  try {
    const response = await axiosInstance.get(
      END_POINTS.process.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get all active workflows", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getActiveProcesses(): Promise<Response> {
  try {
    const response = await axiosInstance.get(
      END_POINTS.process.getAllByStatus("ACTIVE"),
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
    const response = await axiosInstance.get(
      END_POINTS.process.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get process detail", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editProcessDelayReasons(
  params: Record<string, any>
): Promise<Response> {
  try {
    const response = await axiosInstance.patch(
      END_POINTS.process.editDelayReasons(params.entryStageId),
      {
        delayReasonIds: params.delayReasonIds,
        delayNote: ""
      }
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
