/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";

// interface ApiResponse<T = any> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }

export const stageHandlers = {
  createStage,
  deleteStage,
  editStage,
  getStages,
  getStageDetail
};

async function createStage(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.stage.create, params);
    if (response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create stage" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function deleteStage(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.stage.delete(id));
      if (response.status === 200) {
        return Response.json(response.data || []);
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete stages" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function editStage(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(
      END_POINTS.stage.edit(id),
      {
        ...rest
      },
    );
    if (response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create stage" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getStages(): Promise<Response> {
  try {
    const response = await axiosInstance.get<IStageResponseDataTypes>(
      END_POINTS.stage.getAll,
    );
    if (response.status === 200) {
      return Response.json(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to create workflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getStageDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<IStageType>(
      END_POINTS.stage.getDetail(id),
    );
    if (response.status === 200) {
      return Response.json(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to create workflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}