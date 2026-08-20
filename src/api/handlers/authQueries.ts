import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";

import {
  createJsonError,
  createJsonOnlyData,
  extractErrorMessage,
  extractErrorStatus,
} from "./responseHelpers";

export const authHandlers = {
  forgotPassword,
  verifyResetCode,
  resetPassword,
};

async function forgotPassword(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.auth.forgotPassword, {
      email: params.email,
    });
    if (response.status === 200) {
      return createJsonOnlyData(response.data);
    }
    return createJsonError("Failed to send reset code", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function verifyResetCode(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.auth.verifyResetCode, {
      email: params.email,
      code: params.code,
    });
    if (response.status === 200) {
      return createJsonOnlyData(response.data);
    }
    return createJsonError("Failed to verify reset code", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}

async function resetPassword(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const response = await http.post(END_POINTS.auth.resetPassword, {
      resetToken: params.resetToken,
      newPassword: params.newPassword,
    });
    if (response.status === 200) {
      return createJsonOnlyData(response.data);
    }
    return createJsonError("Failed to reset password", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), extractErrorStatus(err));
  }
}
