 
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";

import { createJsonError, createJsonOnlyData, extractErrorMessage } from "./responseHelpers";

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
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create workflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function deleteWorkflow(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(
        END_POINTS.workflow.delete(id),
      );
      if (response.status === 200) {
        return Response.json(response.data || []);
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete workflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function editWorkflow(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;

    if (!id) {
      return Response.json({
        success: false,
        error: "Workflow ID is required",
      });
    }
    const response = await axiosInstance.put(END_POINTS.workflow.edit(id), {
      ...rest,
    });

    if (response.status === 200) {
      return Response.json({ success: true, data: response.data });
    }
    return createJsonError("Failed to fetch projects", 400);
  } catch (err: any) {
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
    return Response.json(
      { success: false, error: "Failed to create workflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
