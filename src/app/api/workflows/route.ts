import { NextRequest } from "next/server";

import { workflowHandlers } from "@/api/handlers/workflowQueries";

export enum WorkflowQueryTypes {
  getAllWorkflows = "GET_ALL_WORKFLOWS",
  createWorkflow = "CREATE_WORKFLOW",
  editWorkflow = "EDIT_WORKFLOW",
  deleteWorkflow = "DELETE_WORKFLOW",
  getWorkflowDetail = "GET_WORKFLOW_DETAIL"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case WorkflowQueryTypes.createWorkflow:
      return await workflowHandlers.createWorkflow(params);
    case WorkflowQueryTypes.deleteWorkflow:
      return await workflowHandlers.deleteWorkflow(id);
    case WorkflowQueryTypes.editWorkflow:
      return await workflowHandlers.editWorkflow(params);
    case WorkflowQueryTypes.getAllWorkflows:
      return await workflowHandlers.getAllWorkflows();
    case WorkflowQueryTypes.getWorkflowDetail:
      return await workflowHandlers.getWorkflowDetail(id);


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
