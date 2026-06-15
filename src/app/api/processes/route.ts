import { NextRequest } from "next/server";

import { processHandlers } from "@/api/handlers/processQueries";

export enum ProcessQueryTypes {
  getAllActiveProcess = "GET_ALL_ACTIVE_PROCESS",
  createProcess = "CREATE_PROCESS",
  editProcess = "EDIT_PROCESS",
  deleteProcess = "DELETE_PROCESS",
  getDetailProcess = "GET_DETAIL_ACTIVE_PROCESS",
  getAllProcess = "GET_ALL_PROCESS",
  editProcessDelayReasons = "EDIT_PROCESS_DELAY_REASONS",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case ProcessQueryTypes.createProcess:
      return await processHandlers.createProcess(params);
    case ProcessQueryTypes.deleteProcess:
      return await processHandlers.deleteProcess(id);
    case ProcessQueryTypes.editProcess:
      return await processHandlers.editProcess(params);
    case ProcessQueryTypes.getAllActiveProcess:
      return await processHandlers.getActiveProcesses();
    case ProcessQueryTypes.getDetailProcess:
      return await processHandlers.getProcessDetail(id);
    case ProcessQueryTypes.getAllProcess:
      return await processHandlers.getAllProcesses();
    case ProcessQueryTypes.editProcessDelayReasons:
      return await processHandlers.editProcessDelayReasons(params);

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
