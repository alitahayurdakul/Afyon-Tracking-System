import { NextRequest } from "next/server";

import { projectHandlers } from "@/api/handlers/projectsQueries";
import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum ProjectQueryTypes {
  getAllProjects = "GET_ALL_PROJECTS",
  createProject = "CREATE_PROJECT",
  editProject = "EDIT_PROJECT",
  deleteProject = "DELETE_PROJECT",
  getDetailProject = "GET_DETAIL_PROJECT",
  getTableProjects = "GET_TABLE_PROJECTS",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, status, pageSize, currentPage } = body;

  const http = createServerAxios(request);

  switch (type) {
    case ProjectQueryTypes.createProject:
      return await projectHandlers.createProject(params, http);
    case ProjectQueryTypes.deleteProject:
      return await projectHandlers.deleteProject(id, http);
    case ProjectQueryTypes.editProject:
      return await projectHandlers.editProject(params, http);
    case ProjectQueryTypes.getAllProjects:
      return await projectHandlers.getProjects(status, http);
    case ProjectQueryTypes.getTableProjects:
      return await projectHandlers.getTableProjects({
        pageSize,
        currentPage,
        status,
      }, http);
    case ProjectQueryTypes.getDetailProject:
      return await projectHandlers.getProjectDetail(id, http);

    default: {
      return Response.json(
        {
          message: "There is no method handler for this request method",
        },
        { status: 400 },
      );
    }
  }
}
