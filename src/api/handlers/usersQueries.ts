import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IUsersType, IUserType } from "@/types/usersTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const userHandlers = {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getUserDetail,
  changePassword,
};

async function createUser(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.user.create, params);
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create user", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteUser(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(END_POINTS.user.delete(id));
      if (response.status === 200 || response.status === 204) {
        return createJsonOnlyData(response.data || { success: true });
      }
    }
    return createJsonError("Failed to delete user", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editUser(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.user.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit user", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function changePassword(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await http.put(END_POINTS.user.changePassword(id), {
      ...rest,
    });
    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to change password", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getUsers(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { currentPage, pageSize } = params;

    const response = await http.get<IUsersType>(
      END_POINTS.user.getAll({ currentPage, pageSize }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch users", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getUserDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IUserType>(
      END_POINTS.user.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch user detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
