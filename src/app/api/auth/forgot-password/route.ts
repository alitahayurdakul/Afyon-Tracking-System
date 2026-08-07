import { NextRequest } from "next/server";

import { authHandlers } from "@/api/handlers/authQueries";
import { createJsonError } from "@/api/handlers/responseHelpers";
import { createServerAxios } from "@/api/serverAxios";

export enum ForgotPasswordQueryTypes {
  forgotPassword = "FORGOT_PASSWORD",
  verifyResetCode = "VERIFY_RESET_CODE",
  resetPassword = "RESET_PASSWORD",
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { params, type } = body;
  const http = createServerAxios(request);

  switch (type) {
    case ForgotPasswordQueryTypes.forgotPassword:
      return await authHandlers.forgotPassword(params, http);
    case ForgotPasswordQueryTypes.verifyResetCode:
      return await authHandlers.verifyResetCode(params, http);
    case ForgotPasswordQueryTypes.resetPassword:
      return await authHandlers.resetPassword(params, http);

    default:
      return createJsonError(
        "There is no method handler for this request method",
        400,
      );
  }
}
