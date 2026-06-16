import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { ProcessOperationsQueryTypes } from "@/app/api/activeProcessOperations/route";

export const useGetSubStageDetailDataQuery = <T>(subStageId: string) => {
    const isEnabled = Boolean(subStageId && subStageId !== "")
  return useQuery({
    queryKey: [`getSubStageDetail_${subStageId}`],
    refetchOnWindowFocus: false,
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.activeProcessOperation.getSubStageDetail,
        {
          type: ProcessOperationsQueryTypes.getSubStageDetail,
          id: subStageId,
        },
      );

      return data;
    },
  });
};
