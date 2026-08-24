import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  IStageResponseDataTypes,
  IStageTableResponseDataTypes,
  IStageType,
} from "@/types/stagesTypes";

import {
  createErrorResponse,
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
} from "./responseHelpers";

export const stageHandlers = {
  createStage,
  deleteStage,
  editStage,
  getStages,
  getStageDetail,
  getTableStages,
};

async function createStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.stage.create, params);
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create sub stage", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}

async function deleteStage(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.stage.delete(id));
      if (response.status === 200) {
        return createJsonOnlyData(response.data || []);
      }
    }
    return createJsonError("Failed to delete stage", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function editStage(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.stage.edit(id), {
      ...rest,
    });
    if (response.status === 200) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to edit stage", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}

async function getStages(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IStageResponseDataTypes>(
      END_POINTS.stage.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.stages || []);
    }
    return createJsonError("Failed to fetch sub stage detail", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}

async function getStageDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IStageType>(
      END_POINTS.stage.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch sub stage detail", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}

async function getTableStages(
  { currentPage, pageSize }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IStageTableResponseDataTypes>(
      END_POINTS.stage.getFilteredStages({ currentPage, pageSize }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch sub stage detail", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}
