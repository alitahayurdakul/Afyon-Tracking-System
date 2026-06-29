import { NextRequest } from "next/server";

import { wagonHandlers } from "@/api/handlers/wagonQueries";

export enum WagonQueryTypes {
  getAllWagons = "GET_ALL_WAGONS",
  createWagon = "CREATE_WAGON",
  editWagon = "EDIT_WAGON",
  deleteWagon = "DELETE_WAGON",
  getDetailWagon = "GET_DETAIL_WAGON",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case WagonQueryTypes.createWagon:
      return await wagonHandlers.createWagon(params);
    case WagonQueryTypes.deleteWagon:
      return await wagonHandlers.deleteWagon(id);
    case WagonQueryTypes.editWagon:
      return await wagonHandlers.editWagon(params);
    case WagonQueryTypes.getAllWagons:
      return await wagonHandlers.getWagons();
    case WagonQueryTypes.getDetailWagon:
      return await wagonHandlers.getWagonDetail(id);

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
