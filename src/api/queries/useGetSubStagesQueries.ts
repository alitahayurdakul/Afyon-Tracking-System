import { useQuery } from "@tanstack/react-query";

import { ProcessOperationsQueryTypes } from "@/app/api/activeProcessOperations/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";

import { axiosInstance } from "../axiosInstance";

export const useGetSubStagesDataQuery = <T>(subStageId: string) => {
    // const isEnabled = Boolean(subStageId && subStageId !== "")
  return useQuery({
    queryKey: [`getSubStageDetail_${subStageId}`],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<{success:boolean; data: T}>(
        CLIENT_END_POINTS.activeProcessOperation.getSubStages,
        {
          type: ProcessOperationsQueryTypes.getSubStages
        },
      );

      return data.data;
    },
  });
};
