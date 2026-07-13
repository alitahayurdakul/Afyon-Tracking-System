import { NextRequest } from "next/server";

import { processHandlers } from "@/api/handlers/processQueries";

export enum ProcessQueryTypes {
  getAllActiveProcess = "GET_ALL_ACTIVE_PROCESS",
  createProcess = "CREATE_PROCESS",
  editProcess = "EDIT_PROCESS",
  deleteProcess = "DELETE_PROCESS",
  getDetailProcess = "GET_DETAIL_ACTIVE_PROCESS",
  getStageDetail = "GET_STAGE_DETAIL",
  startSubStage = "START_SUB_STAGE",
  saveandCompleteSubStage = "SAVE_AND_COMPLETE_SUB_STAGE",
  completeStage = "COMPLETE_STAGE",
  startStage = "START_STAGE"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, processId, stageId, params, type, entryId } = body;

  switch (type) {
    case ProcessQueryTypes.createProcess:
      return await processHandlers.createProcess(params);
    case ProcessQueryTypes.deleteProcess:
      return await processHandlers.deleteProcess(id);
    case ProcessQueryTypes.editProcess:
      return await processHandlers.editProcess(params);
    case ProcessQueryTypes.getAllActiveProcess:
      return await processHandlers.getActiveProcesses(params);
    case ProcessQueryTypes.getDetailProcess:
      return await processHandlers.getProcessDetail(id);
    case ProcessQueryTypes.getStageDetail:
      return await processHandlers.getStageDetail(processId, stageId);
    case ProcessQueryTypes.startSubStage:
      return await processHandlers.startSubStage(params);
    case ProcessQueryTypes.saveandCompleteSubStage:
      return await processHandlers.saveandCompleteSubStage(params);
    case ProcessQueryTypes.completeStage:
      return await processHandlers.completeStage(entryId);
    case ProcessQueryTypes.startStage:
      return await processHandlers.startStage(params);

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
