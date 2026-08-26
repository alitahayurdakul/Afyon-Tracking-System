import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { wagonHandlers } from "@/api/handlers/wagonQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum WagonQueryTypes {
  getAllWagons = "GET_ALL_WAGONS",
  createWagon = "CREATE_WAGON",
  editWagon = "EDIT_WAGON",
  deleteWagon = "DELETE_WAGON",
  getDetailWagon = "GET_DETAIL_WAGON",
  getTableWagons = "GET_TABLE_WAGONS"
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize, search } = body;

  const http = createServerAxios(request);

  switch (type) {
    case WagonQueryTypes.createWagon:
      return await wagonHandlers.createWagon(params, http);
    case WagonQueryTypes.deleteWagon:
      return await wagonHandlers.deleteWagon(id, http);
    case WagonQueryTypes.editWagon:
      return await wagonHandlers.editWagon(params, http);
    case WagonQueryTypes.getAllWagons:
      return await wagonHandlers.getWagons(http);
    case WagonQueryTypes.getDetailWagon:
      return await wagonHandlers.getWagonDetail(id, http);
    case WagonQueryTypes.getTableWagons:
      return await wagonHandlers.getTableWagons(
        { pageSize, currentPage, search },
        http,
      );

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
