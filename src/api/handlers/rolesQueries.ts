import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IRoleResponseDataTypes, IRolesType, IRoleType } from "@/types/rolesTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const roleHandlers = {
  createRole,
  deleteRole,
  editRole,
  getRoles,
  getRoleDetail,
  getTableRoles,
};

async function createRole(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.role.create, params);
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create role", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteRole(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.role.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete role", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editRole(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.role.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit role", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getRoles(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IRolesType>(
      END_POINTS.role.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch roles", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getTableRoles(params: Record<string, any>): Promise<Response> {
  try {
    const { currentPage, pageSize } = params;
    const response = await axiosInstance.get<IRoleResponseDataTypes>(
      END_POINTS.role.getFilteredRoles({ currentPage, pageSize }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || {});
    }
    return createJsonError("Failed to fetch roles", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getRoleDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IRoleType>(
      END_POINTS.role.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch role detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
