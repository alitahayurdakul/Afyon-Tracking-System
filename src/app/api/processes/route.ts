import { NextRequest } from "next/server";

import { processHandlers } from "@/api/handlers/processQueries";
import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum ProcessQueryTypes {
  getAllActiveProcess = "GET_ALL_ACTIVE_PROCESS",
  createProcess = "CREATE_PROCESS",
  editProcess = "EDIT_PROCESS",
  // deleteProcess = "DELETE_PROCESS",
  getDetailProcess = "GET_DETAIL_ACTIVE_PROCESS",
  getStageDetail = "GET_STAGE_DETAIL",
  startSubStage = "START_SUB_STAGE",
  saveandCompleteSubStage = "SAVE_AND_COMPLETE_SUB_STAGE",
  completeStage = "COMPLETE_STAGE",
  startStage = "START_STAGE",
  deleteProcess = "DELETE_PROCESS",
  getTableProcessHistory = "GET_TABLE_PROCESS_HISTORY"
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, processId, stageId, params, type, entryId } = body;

  const http = createServerAxios(request);

  switch (type) {
    case ProcessQueryTypes.createProcess:
      return await processHandlers.createProcess(params, http);
    case ProcessQueryTypes.deleteProcess:
      return await processHandlers.deleteProcess(id, http);
    case ProcessQueryTypes.editProcess:
      return await processHandlers.editProcess(params, http);
    case ProcessQueryTypes.getAllActiveProcess:
      return await processHandlers.getActiveProcesses(params, http);
    case ProcessQueryTypes.getDetailProcess:
      return await processHandlers.getProcessDetail(id, http);
    case ProcessQueryTypes.getStageDetail:
      return await processHandlers.getStageDetail(processId, stageId, http);
    case ProcessQueryTypes.startSubStage:
      return await processHandlers.startSubStage(params, http);
    case ProcessQueryTypes.saveandCompleteSubStage:
      return await processHandlers.saveandCompleteSubStage(params, http);
    case ProcessQueryTypes.completeStage:
      return await processHandlers.completeStage(entryId, http);
    case ProcessQueryTypes.startStage:
      return await processHandlers.startStage(params, http);
    case ProcessQueryTypes.getTableProcessHistory:
      return await processHandlers.getTableProcessHistory(params, http);

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
