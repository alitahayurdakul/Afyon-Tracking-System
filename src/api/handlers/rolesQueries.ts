import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  IRoleResponseDataTypes,
  IRolesType,
  IRoleType,
} from "@/types/rolesTypes";

import {
  createErrorResponse,
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
} from "./responseHelpers";

export const roleHandlers = {
  createRole,
  deleteRole,
  editRole,
  getRoles,
  getRoleDetail,
  getTableRoles,
};

async function createRole(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.role.create, params);
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create role", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function deleteRole(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.role.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete role", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function editRole(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.role.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit role", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getRoles(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IRolesType>(
      END_POINTS.role.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch roles", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getTableRoles(
  { currentPage, pageSize }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IRoleResponseDataTypes>(
      END_POINTS.role.getFilteredRoles({ currentPage, pageSize }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || {});
    }
    return createJsonError("Failed to fetch roles", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getRoleDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IRoleType>(
      END_POINTS.role.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch role detail", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
