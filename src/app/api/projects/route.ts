import { NextRequest } from "next/server";

import { projectHandlers } from "@/api/handlers/projectsQueries";

export enum ProjectQueryTypes {
  getAllProjects = "GET_ALL_PROJECTS",
  createProject = "CREATE_PROJECT",
  editProject = "EDIT_PROJECT",
  deleteProject = "DELETE_PROJECT",
  getDetailProject = "GET_DETAIL_PROJECT",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type, status, pageSize, currentPage } = body;

  switch (type) {
    case ProjectQueryTypes.createProject:
      return await projectHandlers.createProject(params);
    case ProjectQueryTypes.deleteProject:
      return await projectHandlers.deleteProject(id);
    case ProjectQueryTypes.editProject:
      return await projectHandlers.editProject(params);
    case ProjectQueryTypes.getAllProjects:
      return await projectHandlers.getProjects({
        pageSize,
        currentPage,
        status,
      });
    case ProjectQueryTypes.getDetailProject:
      return await projectHandlers.getProjectDetail(id);

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
