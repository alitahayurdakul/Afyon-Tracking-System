/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  ISubStageResponseDataTypes,
  ISubStageType,
} from "@/types/subStagesTypes";
import {
  createJsonError,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const subStageHandlers = {
  createSubStage,
  deleteSubStage,
  editSubStage,
  getSubStages,
  getSubStageDetail,
};

async function createSubStage(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.subStage.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteSubStage(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.subStage.delete(id),
      );
      if (response.status === 200 || response.status === 204) {
        return createJsonSuccess(response.data || { success: true }, 200);
      }
    }
    return createJsonError("Failed to delete sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editSubStage(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.subStage.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit sub stage", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getSubStages(): Promise<Response> {
  try {
    const response = await axiosInstance.get(END_POINTS.subStage.getAll);
    if (response.status === 200) {
      const raw = response.data;
      const subStages: ISubStageType[] = Array.isArray(raw)
        ? raw
        : (raw?.subStages ?? raw?.data ?? []);
      const responseData: ISubStageResponseDataTypes = {
        count: subStages.length,
        subStages,
      };
      return Response.json(responseData);
    }
    return createJsonError("Failed to fetch sub stages", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getSubStageDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<ISubStageType>(
      END_POINTS.subStage.getDetail(id),
    );
    if (response.status === 200) {
      return Response.json(response.data || []);
    }
    return createJsonError("Failed to fetch sub stage detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
