import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { roleHandlers } from "@/api/handlers/rolesQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum RoleQueryTypes {
  getAllRoles = "GET_ALL_ROLES",
  createRole = "CREATE_ROLE",
  editRole = "EDIT_ROLE",
  deleteRole = "DELETE_ROLE",
  getDetailRole = "GET_DETAIL_ROLE",
  getTableRoles = "GET_TABLE_ROLES",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize, search } = body;

  const http = createServerAxios(request);

  switch (type) {
    case RoleQueryTypes.createRole:
      return await roleHandlers.createRole(params, http);
    case RoleQueryTypes.deleteRole:
      return await roleHandlers.deleteRole(id, http);
    case RoleQueryTypes.editRole:
      return await roleHandlers.editRole(params, http);
    case RoleQueryTypes.getAllRoles:
      return await roleHandlers.getRoles(http);
    case RoleQueryTypes.getDetailRole:
      return await roleHandlers.getRoleDetail(id, http);
    case RoleQueryTypes.getTableRoles:
      return await roleHandlers.getTableRoles(
        { pageSize, currentPage, search },
        http,
      );

    default:
      return Response.json(
        { message: "There is no method handler for this request method" },
        { status: 400 },
      );
  }
}
