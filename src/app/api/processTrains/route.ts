import { NextRequest } from "next/server";

import { processTrainsHandlers } from "@/api/handlers/trainProcessesQueries";

export enum ProcessTrainsQueryTypes {
  getProcessTrains = "GET_PROCESS_TRAINS",
  getProcessTrainDetail = "GET_PROCESS_TRAIN_DETAIL",
  getByTrainAndWagonProcesses = "GET_BY_TRAIN_AND_WAGON_PROCESSES",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { params, type } = body;

  switch (type) {
    case ProcessTrainsQueryTypes.getProcessTrains:
      return await processTrainsHandlers.getProcessTrains();
    case ProcessTrainsQueryTypes.getProcessTrainDetail:
      return await processTrainsHandlers.getProcessTrainDetail(params);
    case ProcessTrainsQueryTypes.getByTrainAndWagonProcesses:
      return await processTrainsHandlers.getByTrainAndWagonProcesses(params);

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
