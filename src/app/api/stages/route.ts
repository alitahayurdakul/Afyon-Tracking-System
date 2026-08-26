import { NextRequest } from "next/server";

import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { stageHandlers } from "@/api/handlers/stageQueries";
import { createServerAxios } from "@/api/serverAxios";

export enum StageQueryTypes {
  getAllStages = "GET_ALL_STAGES",
  createStage = "CREATE_STAGE",
  editStage = "EDIT_STAGE",
  deleteStage = "DELETE_STAGE",
  getDetailStage = "GET_DETAIL_STAGE",
  getTableStages = "GET_TABLE_STAGES"
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, currentPage, pageSize, search } = body;

  const http = createServerAxios(request);

  switch (type) {
    case StageQueryTypes.createStage:
      return await stageHandlers.createStage(params, http);
    case StageQueryTypes.deleteStage:
      return await stageHandlers.deleteStage(id, http);
    case StageQueryTypes.editStage:
      return await stageHandlers.editStage(params, http);
    case StageQueryTypes.getAllStages:
      return await stageHandlers.getStages(http);
    case StageQueryTypes.getDetailStage:
      return await stageHandlers.getStageDetail(id, http);
    case StageQueryTypes.getTableStages:
      return await stageHandlers.getTableStages(
        { currentPage, pageSize, search },
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

// try {
//   const response = await axiosInstance.post(END_POINTS.stage.create, params);
//   if (response.status === 201) {
//     return Response.json({success: true}, { status: 200 });
//   }
//   return Response.json(
//     { error: true },
//     { status: 500 },
//   );
// } catch (err) {
//   return Response.json(
//     { error: true },
//     { status: 500 },
//   );
// }

// export async function DELETE(request: NextRequest) {
//   const body = await request.json();
//   const { params } = body;
//   const { stageId } = params;

//   try {
//     const response = await axiosInstance.delete(
//       END_POINTS.stage.delete.replace(":id", stageId)
//     );
//     if (response.status === 200 || response.status === 204) {
//       return Response.json({ success: true }, { status: 200 });
//     }
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   } catch (err) {
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   }
// }

// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   const { params } = body;
//   const { stageId, ...restParams } = params;

//   try {
//     const response = await axiosInstance.put(
//       END_POINTS.stage.edit.replace(":id", stageId),
//       restParams
//     );
//     if (response.status === 200 || response.status === 201) {
//       return Response.json({ success: true }, { status: 200 });
//     }
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   } catch (err) {
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const response = await axiosInstance.get(END_POINTS.stage.getAll);
//     if (response.status === 200) {
//       return Response.json({ success: true, data: response.data }, { status: 200 });
//     }
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   } catch (err) {
//     return Response.json(
//       { error: true },
//       { status: 500 },
//     );
//   }
// }
