import { NextRequest } from "next/server";

import { materialHandlers } from "@/api/handlers/materialsQueries";
import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum MaterialQueryTypes {
  getAllMaterials = "GET_ALL_MATERIALS",
  createMaterial = "CREATE_MATERIAL",
  editMaterial = "EDIT_MATERIAL",
  deleteMaterial = "DELETE_MATERIAL",
  getDetailMaterial = "GET_DETAIL_MATERIAL",
  getTableMaterials = "GET_TABLE_MATERIALS",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, params, type, pageSize, currentPage } = body;

  const http = createServerAxios(request);

  switch (type) {
    case MaterialQueryTypes.createMaterial:
      return await materialHandlers.createMaterial(params, http);
    case MaterialQueryTypes.deleteMaterial:
      return await materialHandlers.deleteMaterial(id, http);
    case MaterialQueryTypes.editMaterial:
      return await materialHandlers.editMaterial(params, http);
    case MaterialQueryTypes.getAllMaterials:
      return await materialHandlers.getMaterials(http);
    case MaterialQueryTypes.getTableMaterials:
      return await materialHandlers.getTableMaterials({
        pageSize,
        currentPage,
      }, http);
    case MaterialQueryTypes.getDetailMaterial:
      return await materialHandlers.getMaterialDetail(id, http);

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
