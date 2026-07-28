import { NextRequest } from "next/server";

import { roleHandlers } from "@/api/handlers/rolesQueries";

export enum RoleQueryTypes {
  getAllRoles = "GET_ALL_ROLES",
  createRole = "CREATE_ROLE",
  editRole = "EDIT_ROLE",
  deleteRole = "DELETE_ROLE",
  getDetailRole = "GET_DETAIL_ROLE",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type, pageSize, currentPage } = body;

  switch (type) {
    case RoleQueryTypes.createRole:
      return await roleHandlers.createRole(params);
    case RoleQueryTypes.deleteRole:
      return await roleHandlers.deleteRole(id);
    case RoleQueryTypes.editRole:
      return await roleHandlers.editRole(params);
    case RoleQueryTypes.getAllRoles:
      return await roleHandlers.getRoles({ pageSize, currentPage });
    case RoleQueryTypes.getDetailRole:
      return await roleHandlers.getRoleDetail(id);

    default:
      return Response.json(
        { message: "There is no method handler for this request method" },
        { status: 400 },
      );
  }
}
