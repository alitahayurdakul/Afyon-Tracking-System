/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  createJsonError,
  createJsonOnlyData,
  extractErrorMessage,
} from "./responseHelpers";

export const processTrainsHandlers = {
  getProcessTrains,
  getProcessTrainDetail,
};

async function getProcessTrains(): Promise<Response> {
  try {
    const response = await axiosInstance.get(
      END_POINTS.processTrains.getAllProcessTrains,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.trains || []);
    }
    return createJsonError("Failed to fetch process trains", 400);
  } catch (err: unknown) {
    return createJsonError(extractErrorMessage(err), 500);
  }
}

async function getProcessTrainDetail(
  params: Record<string, any>,
): Promise<Response> {
  try {
    const { trainId, wagonId } = params;
    console.log(trainId, "trainId");
    const response = await axiosInstance.post(
      END_POINTS.processTrains.getByTrain,
      {
        ...(trainId && { trainId }),
        ...(wagonId && { wagonId }),
      },
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.processes ?? []);
    }
    return createJsonError("Failed to fetch projects", 400);
  } catch (err: unknown) {
    console.log(err, "errorr")
    return createJsonError(extractErrorMessage(err), 500);
  }
}
