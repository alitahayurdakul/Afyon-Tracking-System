import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IReasonsType, IReasonType } from "@/types/reasonsTypes";

import { createJsonOnlyData } from "./responseHelpers";

export const reasonHandlers = {
  createReason,
  deleteReason,
  editReason,
  getReasons,
  getReasonDetail,
};

async function createReason(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.reason.create, params);
    if (response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create reason" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function deleteReason(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.reason.delete(id));
      if (response.status === 200 || response.status === 204) {
        return Response.json(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete reason" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("deleteReason error:", {
      url: END_POINTS.reason.delete(id),
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

async function editReason(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.reason.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit reason" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("editReason error:", {
      url: END_POINTS.reason.edit(params?.id),
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

async function getReasons(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IReasonsType>(
      END_POINTS.reason.getAll,
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to fetch reasons" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getReasonDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IReasonType>(
      END_POINTS.reason.getDetail(id),
    );
    if (response.status === 200) {
      return createJsonOnlyData(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to fetch reason detail" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
