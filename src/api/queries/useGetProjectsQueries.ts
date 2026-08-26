"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { ProjectQueryTypes } from "@/app/api/projects/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { IOptionType } from "@/types/formTypes";
import { optionsConverters } from "@/types/optionsConverter";
import { IProjectsResponseTypes, IProjectType } from "@/types/projectsTypes";

import { axiosInstance } from "../axiosInstance";

export const useGetTableProjectsDataQuery = ({
  pageSize,
  currentPage,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.projects,
  );

  return useQuery({
    queryKey: [
      `getProjectsTableDatas`,
      trigger,
      pageSize,
      currentPage,
      search,
    ],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<IProjectsResponseTypes> => {
      const { data } = await axiosInstance.post<IProjectsResponseTypes>(
        CLIENT_END_POINTS.project.getAll,
        {
          type: ProjectQueryTypes.getTableProjects,
          pageSize,
          currentPage,
          search,
        },
      );
      return data;
    },
  });
};

export const useGetProjectDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.projects,
  );

  return useQuery({
    queryKey: [`getProjectDetailDatas_${id}`, trigger],
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
    (state: RootState) => state.tableTrigger.projects,
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
