import { NextRequest } from "next/server";

import { userHandlers } from "@/api/handlers/usersQueries";

export enum UserQueryTypes {
  getAllUsers = "GET_ALL_USERS",
  createUser = "CREATE_USER",
  editUser = "EDIT_USER",
  deleteUser = "DELETE_USER",
  getDetailUser = "GET_DETAIL_USER",
  changePassword = "CHANGE_PASSWORD",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type, pageSize, currentPage } = body;

  switch (type) {
    case UserQueryTypes.createUser:
      return await userHandlers.createUser(params);
    case UserQueryTypes.deleteUser:
      return await userHandlers.deleteUser(id);
    case UserQueryTypes.editUser:
      return await userHandlers.editUser(params);
    case UserQueryTypes.getAllUsers:
      return await userHandlers.getUsers({ pageSize, currentPage });
    case UserQueryTypes.getDetailUser:
      return await userHandlers.getUserDetail(id);
    case UserQueryTypes.changePassword:
      return await userHandlers.changePassword(
        params,
        request.headers.get("authorization"),
      );

    default:
      return Response.json(
        { message: "There is no method handler for this request method" },
        { status: 400 },
      );
  }
}
