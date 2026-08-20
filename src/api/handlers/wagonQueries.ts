import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import { IWagonResponseDataTypes, IWagonTableResponseDataTypes, IWagonType } from "@/types/wagonsTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const wagonHandlers = {
  createWagon,
  deleteWagon,
  editWagon,
  getWagons,
  getWagonDetail,
  getTableWagons
};

async function createWagon(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.wagon.create, params);
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create wagon", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteWagon(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.wagon.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete wagon", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editWagon(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.wagon.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit wagon", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getWagons(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IWagonResponseDataTypes>(
      END_POINTS.wagon.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.wagons || []);
    }
    return createJsonError("Failed to fetch wagons", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getTableWagons(
  { pageSize, currentPage }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IWagonTableResponseDataTypes>(
      END_POINTS.wagon.getFilteredWagons({ pageSize, currentPage }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch wagons", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getWagonDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IWagonType>(
      END_POINTS.wagon.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch wagon detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
