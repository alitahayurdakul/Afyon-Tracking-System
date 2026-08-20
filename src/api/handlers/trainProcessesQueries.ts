import { AxiosInstance } from "axios";

import { END_POINTS } from "@/consts/endpoints";

import {
  createErrorResponse,
  createJsonError,
  createJsonOnlyData,
} from "./responseHelpers";

export const processTrainsHandlers = {
  getProcessTrains,
  getProcessTrainDetail,
  getByTrainAndWagonProcesses,
};

async function getProcessTrains(http: AxiosInstance): Promise<Response> {
  try {
    const response = await http.get(
      END_POINTS.processTrains.getAllProcessTrains,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.trains || []);
    }
    return createJsonError("Failed to fetch process trains", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getProcessTrainDetail(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { trainId } = params;
    const response = await http.post(
      END_POINTS.processTrains.getByTrain,
      {
        ...(trainId && { trainId }),
      },
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.processes ?? []);
    }
    return createJsonError("Failed to fetch projects", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

async function getByTrainAndWagonProcesses(
  params: Record<string, any>,
  http: AxiosInstance,
): Promise<Response> {
  try {
    const { trainId, wagonId } = params;
    if (!wagonId) {
      return createJsonError("Failed to fetch projects", 502);
    }

    const response = await http.get(
      END_POINTS.processTrains.getByTrainAndWagon(trainId, wagonId),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data.processes ?? []);
    }

    return createJsonError("Failed to fetch projects", 502);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
