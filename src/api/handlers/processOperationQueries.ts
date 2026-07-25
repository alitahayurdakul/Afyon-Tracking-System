
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";

import {
  createJsonError,
  createJsonOnlyData,
  extractErrorMessage,
} from "./responseHelpers";

export const processOperationsHandlers = {
  completeProcess,
};

async function completeProcess(processId: string): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.processOperations.complete(processId || ""),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data);
    }
    return createJsonError("Failed to get all active processes", 400);
  } catch (err: any) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}
