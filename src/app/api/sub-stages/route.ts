import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { subStageHandlers } from "@/api/handlers/subStagesQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum SubStageQueryTypes {
  getAllSubStages = "GET_ALL_SUB_STAGES",
  createSubStage = "CREATE_SUB_STAGE",
  editSubStage = "EDIT_SUB_STAGE",
  deleteSubStage = "DELETE_SUB_STAGE",
  getDetailSubStage = "GET_DETAIL_SUB_STAGE",
  getTableSubStages = "GET_TABLE_SUB_STAGES",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize, search } = body;

  const http = createServerAxios(request);

  switch (type) {
    case SubStageQueryTypes.createSubStage:
      return await subStageHandlers.createSubStage(params, http);
    case SubStageQueryTypes.deleteSubStage:
      return await subStageHandlers.deleteSubStage(id, http);
    case SubStageQueryTypes.editSubStage:
      return await subStageHandlers.editSubStage(params, http);
    case SubStageQueryTypes.getAllSubStages:
      return await subStageHandlers.getSubStages(http);
    case SubStageQueryTypes.getDetailSubStage:
      return await subStageHandlers.getSubStageDetail(id, http);
    case SubStageQueryTypes.getTableSubStages:
      return await subStageHandlers.getTableSubStages({
        pageSize,
        currentPage,
        search,
      }, http);

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
