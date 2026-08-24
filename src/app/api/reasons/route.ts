import { NextRequest } from "next/server";

import { reasonHandlers } from "@/api/handlers/reasonsQueries";
import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum ReasonQueryTypes {
  getAllReasons = "GET_ALL_REASONS",
  createReason = "CREATE_REASON",
  editReason = "EDIT_REASON",
  deleteReason = "DELETE_REASON",
  getDetailReason = "GET_DETAIL_REASON",
  getTableReasons = "GET_TABLE_REASONS",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize } = body;

  const http = createServerAxios(request);

  switch (type) {
    case ReasonQueryTypes.createReason:
      return await reasonHandlers.createReason(params, http);
    case ReasonQueryTypes.deleteReason:
      return await reasonHandlers.deleteReason(id, http);
    case ReasonQueryTypes.editReason:
      return await reasonHandlers.editReason(params, http);
    case ReasonQueryTypes.getAllReasons:
      return await reasonHandlers.getReasons(http);
    case ReasonQueryTypes.getDetailReason:
      return await reasonHandlers.getReasonDetail(id, http);
    case ReasonQueryTypes.getTableReasons:
      return await reasonHandlers.getTableReasons({ pageSize, currentPage }, http);

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
