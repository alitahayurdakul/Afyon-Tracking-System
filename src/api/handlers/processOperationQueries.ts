/* eslint-disable */
import { axiosInstance } from "@/api/axiosInstance";
import { END_POINTS } from "@/consts/endpoints";
import { mockStageDetail, mockStageDetails } from "@/mock/processData";
import { SubStage } from "@/types/activeProcessDetailTypes";

export const processOperationsHandlers = {
  completeProcess,
  getStageDetail
};

async function completeProcess(processId: string): Promise<Response> {
  try {
    const response = await axiosInstance.post(
      END_POINTS.processOperations.complete(processId || "")
    );
    if (response.status === 200) {
      return Response.json({ success: true, data: response.data });
    }
    return Response.json(
      { success: false, error: "Failed to create activeWorkflow" },
      { status: 200 },
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
};

async function getStageDetail(id: string): Promise<Response> {
  try {
    console.log(id);
    // const response = await axiosInstance.post(
    //   END_POINTS.processOperations.complete(processId || "")
    // );
    // if (response.status === 200) {
    //   return Response.json({ success: true, data: response.data });
    // }
    
    return Response.json({ success: true, data: mockStageDetail }); 
    // return Response.json(
    //   { success: false, error: "Failed to create activeWorkflow" },
    //   { status: 200 },
    // );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}