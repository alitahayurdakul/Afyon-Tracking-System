import { axiosInstance } from "@/api/axiosInstance";
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

async function createWagon(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.wagon.create, params);
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create wagon", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteWagon(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.wagon.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete wagon", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editWagon(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.wagon.edit(id), {
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

async function getWagons(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWagonResponseDataTypes>(
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

async function getTableWagons({
  pageSize,
  currentPage,
}: IPaginationTypes): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWagonTableResponseDataTypes>(
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

async function getWagonDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWagonType>(
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
