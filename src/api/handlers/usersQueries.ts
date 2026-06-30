import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IUsersType, IUserType } from "@/types/usersTypes";

import {
  createJsonError,
  createJsonOnlyData,
  extractErrorMessage,
} from "./responseHelpers";

export const userHandlers = {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getUserDetail,
};

async function createUser(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.user.create, params);
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create user" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.response?.data?.message || err?.message },
      { status: 500 },
    );
  }
}

async function deleteUser(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.user.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete user" },
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

async function editUser(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.user.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit user" },
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

async function getUsers(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IUsersType>(
      END_POINTS.user.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch users", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getUserDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IUserType>(
      END_POINTS.user.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch user detail", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
