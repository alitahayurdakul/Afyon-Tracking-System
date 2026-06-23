 
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import {
  ITrainResponseDataTypes,
  ITrainType,
} from "@/types/trainsTypes";

export const trainHandlers = {
  createTrain,
  deleteTrain,
  editTrain,
  getTrains,
  getTrainDetail,
};

async function createTrain(params: Record<string, any>): Promise<Response> {
  try {
    const response = await axiosInstance.post(END_POINTS.train.create, params);
    if (response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create train" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function deleteTrain(id: string): Promise<Response> {
  try {
    if (id) {
      const response = await axiosInstance.delete(END_POINTS.train.delete(id));
      if (response.status === 200 || response.status === 204) {
        return Response.json(response.data || { success: true });
      }
    }
    return Response.json(
      { success: false, error: "Failed to delete train" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("deleteTrain error:", {
      url: END_POINTS.train.delete(id),
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

async function editTrain(params: Record<string, any>): Promise<Response> {
  try {
    const { id, ...rest } = params;
    const response = await axiosInstance.put(END_POINTS.train.edit(id), {
      ...rest,
    });
    if (response.status === 200 || response.status === 201) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to edit train" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("editTrain error:", {
      url: END_POINTS.train.edit(params?.id),
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

async function getTrains(): Promise<Response> {
  try {
    const response = await axiosInstance.get(END_POINTS.train.getAll);
    if (response.status === 200) {
      const raw = response.data;
      const trains: ITrainType[] = Array.isArray(raw)
        ? raw
        : (raw?.trains ?? raw?.data ?? []);
      const payload: ITrainResponseDataTypes = {
        count: trains.length,
        trains,
      };
      return Response.json(payload);
    }
    return Response.json(
      { success: false, error: "Failed to fetch trains" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

async function getTrainDetail(id: string): Promise<Response> {
  try {
    const response = await axiosInstance.get<ITrainType>(
      END_POINTS.train.getDetail(id),
    );
    if (response.status === 200) {
      return Response.json(response.data || []);
    }
    return Response.json(
      { success: false, error: "Failed to fetch train detail" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
