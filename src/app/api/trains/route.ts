import { NextRequest } from "next/server";

import { trainHandlers } from "@/api/handlers/trainQueries";

export enum TrainQueryTypes {
  getAllTrains = "GET_ALL_TRAINS",
  createTrain = "CREATE_TRAIN",
  editTrain = "EDIT_TRAIN",
  deleteTrain = "DELETE_TRAIN",
  getDetailTrain = "GET_DETAIL_TRAIN",
  getTableTrain = "GET_TABLE_TRAIN"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type, pageSize, currentPage } = body;

  switch (type) {
    case TrainQueryTypes.createTrain:
      return await trainHandlers.createTrain(params);
    case TrainQueryTypes.deleteTrain:
      return await trainHandlers.deleteTrain(id);
    case TrainQueryTypes.editTrain:
      return await trainHandlers.editTrain(params);
    case TrainQueryTypes.getAllTrains:
      return await trainHandlers.getTrains();
    case TrainQueryTypes.getDetailTrain:
      return await trainHandlers.getTrainDetail(id);
    case TrainQueryTypes.getTableTrain:
      return await trainHandlers.getTableTrains({pageSize, currentPage})

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
