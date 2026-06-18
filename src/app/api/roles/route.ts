import { NextRequest } from "next/server";

import { roleHandlers } from "@/api/handlers/rolesQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum RoleQueryTypes {
  getAllRoles = "GET_ALL_ROLES",
  createRole = "CREATE_ROLE",
  editRole = "EDIT_ROLE",
  deleteRole = "DELETE_ROLE",
  getDetailRole = "GET_DETAIL_ROLE",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;
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

    default:
      return Response.json(
        { message: "There is no method handler for this request method" },
        { status: 400 },
      );
  }
}
