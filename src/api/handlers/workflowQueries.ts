import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";
import { IPaginationTypes } from "@/types/commonTypes";
import {
  ITableWorkflowResponseTypes,
  IWorkflowResponseTypes,
} from "@/types/workflowTypes";

import {
  createErrorResponse,
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
} from "./responseHelpers";

export const workflowHandlers = {
  createWorkflow,
  deleteWorkflow,
  editWorkflow,
  getAllWorkflows,
  getWorkflowDetail,
  getTableWorkflows
};

async function getAllWorkflows(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IWorkflowResponseTypes>(
      END_POINTS.workflow.getAll,
    );

    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch workflows", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}

async function createWorkflow(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.post(
      END_POINTS.workflow.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create workflow", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function deleteWorkflow(id: string, http: AxiosInstance): Promise<Response> {
  try {
    if (id) {
      const response = await http.delete(
        END_POINTS.workflow.delete(id),
      );
      if (response.status === 200) {
        return createJsonOnlyData(response.data || []);
      }
    }
    return createJsonError("Failed to delete workflow", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function editWorkflow(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  try {
    const { id, ...rest } = params;

    if (!id) {
      return createJsonError("Workflow ID is required", 400);
    }
    const response = await http.put(END_POINTS.workflow.edit(id), {
      ...rest,
    });

    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit workflow", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getWorkflowDetail(id: string, http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get<IWorkflowResponseTypes>(
      END_POINTS.workflow.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch workflow detail", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getTableWorkflows(
  { pageSize, currentPage }: IPaginationTypes,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.get<ITableWorkflowResponseTypes>(
      END_POINTS.workflow.getFilteredWorkflows({ pageSize, currentPage }),
    );

    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch workflows", 502);
  } catch (err: any) {
    return createErrorResponse(err);
  }
}
