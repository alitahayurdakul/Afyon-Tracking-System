import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { userHandlers } from "@/api/handlers/usersQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum UserQueryTypes {
  getAllUsers = "GET_ALL_USERS",
  createUser = "CREATE_USER",
  editUser = "EDIT_USER",
  deleteUser = "DELETE_USER",
  getDetailUser = "GET_DETAIL_USER",
  changePassword = "CHANGE_PASSWORD",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type } = body;

  const http = createServerAxios(request);

  switch (type) {
    case UserQueryTypes.createUser:
      return await userHandlers.createUser(params, http);
    case UserQueryTypes.deleteUser:
      return await userHandlers.deleteUser(id, http);
    case UserQueryTypes.editUser:
      return await userHandlers.editUser(params, http);
    case UserQueryTypes.getAllUsers:
      return await userHandlers.getUsers(params, http);
    case UserQueryTypes.getDetailUser:
      return await userHandlers.getUserDetail(id, http);
    case UserQueryTypes.changePassword:
      return await userHandlers.changePassword(params, http);

    default:
      return Response.json(
        { message: "There is no method handler for this request method" },
        { status: 400 },
      );
  }
}
