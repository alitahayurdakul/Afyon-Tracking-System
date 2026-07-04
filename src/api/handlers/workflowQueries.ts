 
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";

import {
  createJsonError,
  createJsonOnlyData,
  createJsonSuccess,
  extractErrorMessage,
} from "./responseHelpers";

export const workflowHandlers = {
  createWorkflow,
  deleteWorkflow,
  editWorkflow,
  getAllWorkflows,
  getWorkflowDetail,
};

async function getAllWorkflows(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWorkflowResponseTypes>(
      END_POINTS.workflow.getAll,
    );

    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch workflows", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function createWorkflow(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.workflow.create,
      params,
    );
    if (response.status === 201) {
      return createJsonSuccess(response.data, 201);
    }
    return createJsonError("Failed to create workflow", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function deleteWorkflow(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.workflow.delete(id),
      );
      if (response.status === 200) {
        return createJsonOnlyData(response.data || []);
      }
    }
    return createJsonError("Failed to delete workflow", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function editWorkflow(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;

    if (!id) {
      return createJsonError("Workflow ID is required", 400);
    }
    const response = await axiosInstance.put(END_POINTS.workflow.edit(id), {
      ...rest,
    });

    if (response.status === 200) {
      return createJsonSuccess(response.data, 200);
    }
    return createJsonError("Failed to edit workflow", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getWorkflowDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWorkflowResponseTypes>(
      END_POINTS.workflow.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return createJsonError("Failed to fetch workflow detail", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
