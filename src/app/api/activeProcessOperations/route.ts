import { NextRequest } from "next/server";

import { processOperationsHandlers } from "@/api/handlers/processOperationQueries";
import {
  createJsonError,
  readJsonBody,
} from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum ProcessOperationsQueryTypes {
  completeProcess = "COMPLETE_PROCESS",
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  if (!body) {
    return createJsonError("Invalid JSON body", 400);
  }
  const { id, type } = body;

  const http = createServerAxios(request);

  switch (type) {
    case ProcessOperationsQueryTypes.completeProcess:
      return await processOperationsHandlers.completeProcess(id, http);

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
