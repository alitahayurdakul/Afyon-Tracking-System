import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IRolesType, IRoleType } from "@/types/rolesTypes";

import {
  createJsonError,
  createJsonOnlyData,
  extractErrorMessage,
} from "./responseHelpers";

export const roleHandlers = {
  createRole,
  deleteRole,
  editRole,
  getRoles,
  getRoleDetail,
};

async function createRole(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.role.create, params);
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create role" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: 500 },
    );
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
    return Response.json(
      { success: false, error: "Failed to delete role" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err?.response?.data?.message || err?.message,
      },
      { status: 500 },
    );
  }
}

async function editRole(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.role.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit role" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err?.response?.data?.message || err?.message,
      },
      { status: 500 },
    );
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
  } catch (err: any) {
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
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
