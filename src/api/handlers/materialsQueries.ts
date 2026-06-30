/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  IMaterialResponseDataTypes,
  IMaterialType,
} from "@/types/materialsTypes";
import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const materialHandlers = {
  createMaterial,
  deleteMaterial,
  editMaterial,
  getMaterials,
  getMaterialDetail,
};

async function createMaterial(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.material.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteMaterial(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.material.delete(id),
      );
      if (response.status === 200 || response.status === 204) {
        return createJsonSuccess(response.data || { success: true }, 200);
      }
    }
    return createJsonError("Failed to delete material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editMaterial(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.material.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit material", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getMaterials(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IMaterialResponseDataTypes>(END_POINTS.material.getAll);
    if (response.status === 200) {    
      return createJsonOnlyData(response.data.materials || []);
    }
    return createJsonError("Failed to fetch materials", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getMaterialDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IMaterialType>(
      END_POINTS.material.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch material detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
