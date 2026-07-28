import { NextRequest } from "next/server";

import { subStageHandlers } from "@/api/handlers/subStagesQueries";

export enum SubStageQueryTypes {
  getAllSubStages = "GET_ALL_SUB_STAGES",
  createSubStage = "CREATE_SUB_STAGE",
  editSubStage = "EDIT_SUB_STAGE",
  deleteSubStage = "DELETE_SUB_STAGE",
  getDetailSubStage = "GET_DETAIL_SUB_STAGE",
  getTableSubStages = "GET_TABLE_SUB_STAGES",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type, currentPage, pageSize } = body;

  switch (type) {
    case SubStageQueryTypes.createSubStage:
      return await subStageHandlers.createSubStage(params);
    case SubStageQueryTypes.deleteSubStage:
      return await subStageHandlers.deleteSubStage(id);
    case SubStageQueryTypes.editSubStage:
      return await subStageHandlers.editSubStage(params);
    case SubStageQueryTypes.getAllSubStages:
      return await subStageHandlers.getSubStages();
    case SubStageQueryTypes.getDetailSubStage:
      return await subStageHandlers.getSubStageDetail(id);
    case SubStageQueryTypes.getTableSubStages:
      return await subStageHandlers.getTableSubStages({
        pageSize,
        currentPage,
      });

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
