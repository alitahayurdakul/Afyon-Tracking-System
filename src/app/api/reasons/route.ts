import { NextRequest } from "next/server";

import { reasonHandlers } from "@/api/handlers/reasonsQueries";

export enum ReasonQueryTypes {
  getAllReasons = "GET_ALL_REASONS",
  createReason = "CREATE_REASON",
  editReason = "EDIT_REASON",
  deleteReason = "DELETE_REASON",
  getDetailReason = "GET_DETAIL_REASON",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case ReasonQueryTypes.createReason:
      return await reasonHandlers.createReason(params);
    case ReasonQueryTypes.deleteReason:
      return await reasonHandlers.deleteReason(id);
    case ReasonQueryTypes.editReason:
      return await reasonHandlers.editReason(params);
    case ReasonQueryTypes.getAllReasons:
      return await reasonHandlers.getReasons();
    case ReasonQueryTypes.getDetailReason:
      return await reasonHandlers.getReasonDetail(id);

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
