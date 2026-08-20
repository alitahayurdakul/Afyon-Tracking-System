import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { trainHandlers } from "@/api/handlers/trainQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum TrainQueryTypes {
  getAllTrains = "GET_ALL_TRAINS",
  createTrain = "CREATE_TRAIN",
  editTrain = "EDIT_TRAIN",
  deleteTrain = "DELETE_TRAIN",
  getDetailTrain = "GET_DETAIL_TRAIN",
  getTableTrain = "GET_TABLE_TRAIN"
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, pageSize, currentPage } = body;

  const http = createServerAxios(request);

  switch (type) {
    case TrainQueryTypes.createTrain:
      return await trainHandlers.createTrain(params, http);
    case TrainQueryTypes.deleteTrain:
      return await trainHandlers.deleteTrain(id, http);
    case TrainQueryTypes.editTrain:
      return await trainHandlers.editTrain(params, http);
    case TrainQueryTypes.getAllTrains:
      return await trainHandlers.getTrains(http);
    case TrainQueryTypes.getDetailTrain:
      return await trainHandlers.getTrainDetail(id, http);
    case TrainQueryTypes.getTableTrain:
      return await trainHandlers.getTableTrains({pageSize, currentPage}, http)

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
