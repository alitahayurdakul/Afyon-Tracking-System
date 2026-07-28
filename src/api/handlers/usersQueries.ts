import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
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

async function createUser(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.user.create, params);
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create user", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
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
    return createJsonError("Failed to delete user", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editUser(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.user.edit(id), {
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
  authorization?: string | null,
): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(
      END_POINTS.user.changePassword(id),
      { ...rest },
      authorization ? { headers: { Authorization: authorization } } : undefined,
    );
    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to change password", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getUsers({
  pageSize,
  currentPage,
}: IPaginationTypes): Promise<Response> {
  try {
    const response = await axiosInstance.get<IUsersType>(
      END_POINTS.user.getAll({ pageSize, currentPage }),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch users", 400);
  } catch (err: unknown) {
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
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
