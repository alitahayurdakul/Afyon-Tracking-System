"use client";
import { useQuery } from "@tanstack/react-query";

// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { ProjectQueryTypes } from "@/app/api/projects/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  IProjectResponseDataTypes,
  IProjectType,
} from "@/types/projectsTypes";
import { mockProjects, mockProjectsResponse } from "@/mock/managementData";

export const useGetProjectsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getProjectsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IProjectResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IProjectResponseDataTypes>(
      //   CLIENT_END_POINTS.project.getAll,
      //   { type: ProjectQueryTypes.getAllProjects },
      // );
      // return data;
      return mockProjectsResponse;
    },
  });
};

export const useGetProjectDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getProjectDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<IProjectType | undefined> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IProjectType>(
      //   CLIENT_END_POINTS.project.getDetail,
      //   { type: ProjectQueryTypes.getDetailProject, id },
      // );
      // return data;
      return mockProjects.find((project) => project._id === id);
    },
  });
};
