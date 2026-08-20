import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import { IReasonResponseDataTypes, IReasonsType, IReasonType } from "@/types/reasonsTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
  extractErrorStatus,
} from "./responseHelpers";

export const reasonHandlers = {
  createReason,
  deleteReason,
  editReason,
  getReasons,
  getReasonDetail,
  getTableReasons
};

async function createReason(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.reason.create, params);
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create reason", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function deleteReason(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.reason.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete reason", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function editReason(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.reason.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit reason", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getReasons(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IReasonsType>(
      END_POINTS.reason.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch reasons", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getTableReasons({pageSize, currentPage}: IPaginationTypes, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IReasonResponseDataTypes>(
      END_POINTS.reason.getFilteredReasons({pageSize, currentPage}),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch reasons", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getReasonDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IReasonType>(
      END_POINTS.reason.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch reason detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}
