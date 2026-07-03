import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { ProcessOperationsQueryTypes } from "@/app/api/activeProcessOperations/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";

import { axiosInstance } from "../axiosInstance";

export const useGetStageDetailDataQuery = <T>(subStageId: string) => {
  const isEnabled = Boolean(subStageId && subStageId !== "");
  const { id: stageId } = useParams();

  return useQuery({
    queryKey: [`getSubStageDetail_${subStageId}`],
    refetchOnWindowFocus: false,
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await axiosInstance.post<{ success: boolean; data: T }>(
        CLIENT_END_POINTS.activeProcessOperation.getStageDetail,
        {
          type: ProcessOperationsQueryTypes.getStageDetail,
          id: stageId
        },
      );

      return data.data;
    },
  });
};
