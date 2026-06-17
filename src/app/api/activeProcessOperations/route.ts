import { NextRequest } from "next/server";

import { processOperationsHandlers } from "@/api/handlers/processOperationQueries";

export enum ProcessOperationsQueryTypes {
  completeProcess = "COMPLETE_PROCESS",
  getSubStages = "GET_SUB_STAGES"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, stageId, params, type } = body;

  switch (type) {

    case ProcessOperationsQueryTypes.completeProcess:
      return await processOperationsHandlers.completeProcess(id);
    case ProcessOperationsQueryTypes.getSubStages:
      return await processOperationsHandlers.getSubStages();

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
