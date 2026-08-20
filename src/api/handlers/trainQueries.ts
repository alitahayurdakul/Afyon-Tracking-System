import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  ITrainsResponseDataTypes,
  ITrainsType,
  ITrainType,
} from "@/types/trainsTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
  extractErrorStatus,
} from "./responseHelpers";

export const trainHandlers = {
  createTrain,
  deleteTrain,
  editTrain,
  getTrains,
  getTrainDetail,
  getTableTrains,
};

async function createTrain(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.train.create, params);
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create train", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function deleteTrain(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.train.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete train", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function editTrain(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.train.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit train", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getTrains(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<ITrainsType>(
      END_POINTS.train.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch trains", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getTrainDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<ITrainType>(
      END_POINTS.train.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch train detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getTableTrains(
  { pageSize, currentPage }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<ITrainsResponseDataTypes>(
      END_POINTS.train.getFilteredTrains({ pageSize, currentPage }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch trains", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}
