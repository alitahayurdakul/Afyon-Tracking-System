import { NextRequest } from "next/server";

import { processOperationsHandlers } from "@/api/handlers/processOperationQueries";

export enum ProcessOperationsQueryTypes {
  nextStageInProcess = "NEXT_STAGE_IN_PROCESS",
  completeProcess = "COMPLETE_PROCESS",
  skipStage = "SKIP_STAGE"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, stageId, params, type } = body;

  switch (type) {
    case ProcessOperationsQueryTypes.nextStageInProcess:
      return await processOperationsHandlers.nextStage(params);
    case ProcessOperationsQueryTypes.completeProcess:
      return await processOperationsHandlers.completeProcess(id);
    case ProcessOperationsQueryTypes.skipStage:
      return await processOperationsHandlers.skipStage(stageId);

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
