import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { processTrainsHandlers } from "@/api/handlers/trainProcessesQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum ProcessTrainsQueryTypes {
  getProcessTrains = "GET_PROCESS_TRAINS",
  getProcessTrainDetail = "GET_PROCESS_TRAIN_DETAIL",
  getByTrainAndWagonProcesses = "GET_BY_TRAIN_AND_WAGON_PROCESSES",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { params, type } = body;

  const http = createServerAxios(request);

  switch (type) {
    case ProcessTrainsQueryTypes.getProcessTrains:
      return await processTrainsHandlers.getProcessTrains(http);
    case ProcessTrainsQueryTypes.getProcessTrainDetail:
      return await processTrainsHandlers.getProcessTrainDetail(params, http);
    case ProcessTrainsQueryTypes.getByTrainAndWagonProcesses:
      return await processTrainsHandlers.getByTrainAndWagonProcesses(params, http);

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
