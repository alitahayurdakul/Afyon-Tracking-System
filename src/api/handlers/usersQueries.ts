 
import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IUserResponseDataTypes, IUserType } from "@/types/usersTypes";

export const userHandlers = {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getUserDetail,
};

async function createUser(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.user.create, params);
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create user" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error:
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.success ||
          err?.message,
      },
      { status: err?.response?.status || 500 },
    );
  }
}

async function deleteUser(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.user.delete(id));
      if (response.status === 200 || response.status === 204) {
        return Response.json(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete user" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function editUser(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.user.edit(id), rest);
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit user" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function getUsers(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get(END_POINTS.user.getAll);
    if (response.status === 200) {
      const raw = response.data;
      const users: IUserType[] = Array.isArray(raw)
        ? raw
        : (raw?.users ?? raw?.data ?? []);
      const payload: IUserResponseDataTypes = {
        count: users.length,
        users,
      };
      return Response.json(payload);
    }
    return Response.json(
      { success: false, error: "Failed to fetch users" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}

async function getUserDetail(
  id: string,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<IUserType>(END_POINTS.user.getDetail(id));
    if (response.status === 200) {
      return Response.json(response.data);
    }
    return Response.json(
      { success: false, error: "Failed to fetch user detail" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message },
      { status: err?.response?.status || 500 },
    );
  }
}
