import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  IMaterialResponseDataTypes,
  IMaterialType,
} from "@/types/materialsTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
  extractErrorStatus,
} from "./responseHelpers";

export const materialHandlers = {
  createMaterial,
  deleteMaterial,
  editMaterial,
  getMaterials,
  getMaterialDetail,
  getTableMaterials
};

async function createMaterial(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(
      END_POINTS.material.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function deleteMaterial(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(
        END_POINTS.material.delete(id),
      );
      if (response.status === 200 || response.status === 204) {
        return createJsonSuccess(response.data || { success: true }, 200);
      }
    }
    return createJsonError("Failed to delete material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function editMaterial(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.material.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getMaterials(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get(END_POINTS.material.getAll);

    if (response.status === 200) {
      return createJsonOnlyData(response.data.materials || []);
    }
    return createJsonError("Failed to fetch materials", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getTableMaterials(
  { pageSize, currentPage }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IMaterialResponseDataTypes>(
      END_POINTS.material.getFilteredMaterials({ pageSize, currentPage }),
    );

    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch materials", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function getMaterialDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IMaterialType>(
      END_POINTS.material.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch material detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}
