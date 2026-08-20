import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { ResponseStatusEnums } from "@/utils/enum/commonEnums";

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
  getStageDetail,
  startSubStage,
  saveandCompleteSubStage,
  completeStage,
  startStage,
  getTableProcessHistory,
};

async function createProcess(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.process.start, {
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

async function deleteProcess(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(
        END_POINTS.process.deleteProcess(id),
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

async function editProcess(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.process.edit(id), {
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
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { status, projectId } = params || {};
    const response = await http.get(
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

async function getProcessDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get(END_POINTS.process.getDetail(id));
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get process detail", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getStageDetail(
  processId: string,
  stageId: string,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get(
      END_POINTS.process.stageDetail(processId || "", stageId || ""),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.subStages);
    }

    return createJsonError("Failed to get process detail", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function startSubStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { processId, stageId, subStageId } = params;
    const response = await http.put(
      END_POINTS.process.subStageOperation(processId, stageId, subStageId),
      {
        status: ResponseStatusEnums.active,
      },
    );

    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to start a sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function saveandCompleteSubStage(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { processId, stageId, subStageId, data } = params;

    const response = await http.put(
      END_POINTS.process.subStageOperation(processId, stageId, subStageId),
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

async function completeStage(entryId: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.patch(
      END_POINTS.process.completeStage(entryId),
    );

    if (response.status === 200) {
      return createJsonSuccess(200);
    }

    return createJsonError("Failed to start a sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function startStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  const { stageId, processId, operator } = params;
  try {
    const params = {
      stageId,
      operator,
    };
    const response = await http.post(
      END_POINTS.process.startStage(processId),
      { ...params },
    );

    if (response.status === 201) {
      return createJsonSuccess(200);
    }

    return createJsonError("Failed to start a sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getTableProcessHistory(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { status, currentPage, pageSize } = params || {};
    const response = await http.get(
      END_POINTS.process.getFilteredProcessHistory({
        status,
        currentPage,
        pageSize,
      }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to get all active processes", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
