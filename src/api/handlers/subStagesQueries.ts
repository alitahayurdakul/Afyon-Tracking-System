import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  ISubStageResponseDataTypes,
  ISubStageType,
  ITableSubStageResponseTypes,
} from "@/types/subStagesTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const subStageHandlers = {
  createSubStage,
  deleteSubStage,
  editSubStage,
  getSubStages,
  getSubStageDetail,
  getTableSubStages
};

async function createSubStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(
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

async function deleteSubStage(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(
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

async function editSubStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.subStage.edit(id), {
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

async function getSubStages(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<ISubStageResponseDataTypes>(
      END_POINTS.subStage.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.subStages ?? []);
    }
    return createJsonError("Failed to fetch sub stages", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getSubStageDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<ISubStageType>(
      END_POINTS.subStage.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data);
    }
    return createJsonError("Failed to fetch sub stage detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getTableSubStages(
  { pageSize, currentPage }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<ITableSubStageResponseTypes>(
      END_POINTS.subStage.getFilteredSubStages({ pageSize, currentPage }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data ?? []);
    }
    return createJsonError("Failed to fetch sub stages", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
