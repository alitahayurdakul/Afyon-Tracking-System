/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  IProjectResponseDataTypes,
  IProjectType,
} from "@/types/projectsTypes";
import {
  createJsonError,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const projectHandlers = {
  createProject,
  deleteProject,
  editProject,
  getProjects,
  getProjectDetail,
};

async function createProject(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.project.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create project", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteProject(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.project.delete(id),
      );
      if (response.status === 200 || response.status === 204) {
        return createJsonSuccess(response.data || { success: true }, 200);
      }
    }
    return createJsonError("Failed to delete project", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editProject(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.project.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit project", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getProjects(): Promise<Response> {
  try {
    const response = await axiosInstance.get(END_POINTS.project.getAll);
    if (response.status === 200) {
      const raw = response.data;
      const projects: IProjectType[] = Array.isArray(raw)
        ? raw
        : (raw?.projects ?? raw?.data ?? []);
      const responseData: IProjectResponseDataTypes = {
        count: projects.length,
        projects,
      };
      return Response.json(responseData);
    }
    return createJsonError("Failed to fetch projects", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getProjectDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IProjectType>(
      END_POINTS.project.getDetail(id),
    );
    if (response.status === 200) {
      return Response.json(response.data || []);
    }
    return createJsonError("Failed to fetch project detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
