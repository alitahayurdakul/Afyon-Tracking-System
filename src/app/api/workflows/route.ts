import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { workflowHandlers } from "@/api/handlers/workflowQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum WorkflowQueryTypes {
  getAllWorkflows = "GET_ALL_WORKFLOWS",
  createWorkflow = "CREATE_WORKFLOW",
  editWorkflow = "EDIT_WORKFLOW",
  deleteWorkflow = "DELETE_WORKFLOW",
  getWorkflowDetail = "GET_WORKFLOW_DETAIL",
  getTableWorkflows = "GET_TABLE_WORKFLOWS",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize } = body;

  const http = createServerAxios(request);

  switch (type) {
    case WorkflowQueryTypes.createWorkflow:
      return await workflowHandlers.createWorkflow(params, http);
    case WorkflowQueryTypes.deleteWorkflow:
      return await workflowHandlers.deleteWorkflow(id, http);
    case WorkflowQueryTypes.editWorkflow:
      return await workflowHandlers.editWorkflow(params, http);
    case WorkflowQueryTypes.getAllWorkflows:
      return await workflowHandlers.getAllWorkflows(http);
    case WorkflowQueryTypes.getWorkflowDetail:
      return await workflowHandlers.getWorkflowDetail(id, http);
    case WorkflowQueryTypes.getTableWorkflows:
      return await workflowHandlers.getTableWorkflows({
        currentPage,
        pageSize,
      }, http);

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
