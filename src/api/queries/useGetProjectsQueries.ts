"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { ProjectQueryTypes } from "@/app/api/projects/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IOptionType } from "@/types/formTypes";
import { optionsConverters } from "@/types/optionsConverter";
import {
  IProjectType,
} from "@/types/projectsTypes";

import { axiosInstance } from "../axiosInstance";

export const useGetProjectsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getProjectsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IProjectType[]> => {
      const { data } = await axiosInstance.post<IProjectType[]>(
        CLIENT_END_POINTS.project.getAll,
        { type: ProjectQueryTypes.getAllProjects },
      );
      return data;
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
      const { data } = await axiosInstance.post<IProjectType>(
        CLIENT_END_POINTS.project.getDetail,
        { type: ProjectQueryTypes.getDetailProject, id },
      );
      return data;
    },
  });
};

export const useGetProjectOptionsDataQuery = (status?: string) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getProjectsAllDatas`, trigger, status],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IOptionType[]> => {
      const { data } = await axiosInstance.post<IProjectType[]>(
        CLIENT_END_POINTS.project.getAll,
        { type: ProjectQueryTypes.getAllProjects, status },
      );
      return optionsConverters(data, "_id", "name") as unknown as IOptionType[];
    },
  });
};