import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";

import { axiosInstance } from "../axiosInstance";

export const useGetStageDetailDataQuery = <T>(stageId: string) => {
  const isEnabled = Boolean(stageId && stageId !== "");
  const { id: processId } = useParams();

  return useQuery({
    queryKey: [`getProcessStageDetail_${stageId}`],
    refetchOnWindowFocus: false,
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.processes.getProcessStageDetail,
        {
          type: ProcessQueryTypes.getStageDetail,
          processId,
          stageId,
        },
      );


      return data;
    },
  });
};
