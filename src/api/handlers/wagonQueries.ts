
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  IWagonResponseDataTypes,
  IWagonType,
} from "@/types/wagonsTypes";

import { createJsonOnlyData } from "./responseHelpers";

export const wagonHandlers = {
  createWagon,
  deleteWagon,
  editWagon,
  getWagons,
  getWagonDetail,
};

async function createWagon(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.wagon.create, params);
    if (response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create wagon" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function deleteWagon(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.wagon.delete(id));
      if (response.status === 200 || response.status === 204) {
        return Response.json(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete wagon" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("deleteWagon error:", {
      url: END_POINTS.wagon.delete(id),
      id,
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });
    return Response.json(
      {
        success: false,
        error: err?.response?.data?.message || err?.message,
      },
      { status: 500 },
    );
  }
}

async function editWagon(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.wagon.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit wagon" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("editWagon error:", {
      url: END_POINTS.wagon.edit(params?.id),
      params,
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });
    return Response.json(
      {
        success: false,
        error: err?.response?.data?.message || err?.message,
      },
      { status: 500 },
    );
  }
}

async function getWagons(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWagonResponseDataTypes>(END_POINTS.wagon.getAll);
    if (response.status === 200) {
      return createJsonOnlyData(response.data.wagons || []);
    }
    return Response.json(
      { success: false, error: "Failed to fetch wagons" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getWagonDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IWagonType>(
      END_POINTS.wagon.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to fetch wagon detail" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
