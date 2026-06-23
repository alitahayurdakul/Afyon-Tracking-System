 
import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IRoleResponseDataTypes, IRoleType } from "@/types/rolesTypes";

export const roleHandlers = {
  createRole,
  deleteRole,
  editRole,
  getRoles,
  getRoleDetail,
};

async function createRole(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.role.create, params);
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
      { status: err?.response?.status || 500 },
    );
  }
}

async function deleteRole(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.role.delete(id));
      if (response.status === 200 || response.status === 204) {
        return Response.json(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete role" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function editRole(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.role.edit(id), rest);
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit role" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function getRoles(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get(END_POINTS.role.getAll);
    if (response.status === 200) {
      const raw = response.data;
      const roles: IRoleType[] = Array.isArray(raw)
        ? raw
        : (raw?.roles ?? raw?.data ?? []);
      const payload: IRoleResponseDataTypes = {
        count: roles.length,
        roles,
      };
      return Response.json(payload);
    }
    return Response.json(
      { success: false, error: "Failed to fetch roles" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function getRoleDetail(
  id: string,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IRoleType>(END_POINTS.role.getDetail(id));
    if (response.status === 200) {
      return Response.json(response.data);
    }
    return Response.json(
      { success: false, error: "Failed to fetch role detail" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}
