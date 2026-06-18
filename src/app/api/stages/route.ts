import { NextRequest } from "next/server";

import { stageHandlers } from "@/api/handlers/stageQueries";

export enum StageQueryTypes {
  getAllStages = "GET_ALL_STAGES",
  createStage = "CREATE_STAGE",
  editStage = "EDIT_STAGE",
  deleteStage = "DELETE_STAGE",
  getDetailStage = "GET_DETAIL_STAGE"
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case StageQueryTypes.createStage:
      return await stageHandlers.createStage(params);
    case StageQueryTypes.deleteStage:
      return await stageHandlers.deleteStage(id);
    case StageQueryTypes.editStage:
      return await stageHandlers.editStage(params);
    case StageQueryTypes.getAllStages:
      return await stageHandlers.getStages();
    case StageQueryTypes.getDetailStage:
      return await stageHandlers.getStageDetail(id);

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
