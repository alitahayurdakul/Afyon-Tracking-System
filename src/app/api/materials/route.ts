import { NextRequest } from "next/server";

import { materialHandlers } from "@/api/handlers/materialsQueries";

export enum MaterialQueryTypes {
  getAllMaterials = "GET_ALL_MATERIALS",
  createMaterial = "CREATE_MATERIAL",
  editMaterial = "EDIT_MATERIAL",
  deleteMaterial = "DELETE_MATERIAL",
  getDetailMaterial = "GET_DETAIL_MATERIAL",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, params, type } = body;

  switch (type) {
    case MaterialQueryTypes.createMaterial:
      return await materialHandlers.createMaterial(params);
    case MaterialQueryTypes.deleteMaterial:
      return await materialHandlers.deleteMaterial(id);
    case MaterialQueryTypes.editMaterial:
      return await materialHandlers.editMaterial(params);
    case MaterialQueryTypes.getAllMaterials:
      return await materialHandlers.getMaterials();
    case MaterialQueryTypes.getDetailMaterial:
      return await materialHandlers.getMaterialDetail(id);

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
