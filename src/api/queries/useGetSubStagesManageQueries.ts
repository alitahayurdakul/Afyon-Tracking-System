"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { optionsConverters } from "@/types/optionsConverter";
import {
  ISubStageType,
  ITableSubStageResponseTypes,
} from "@/types/subStagesTypes";

export const useGetSubStagesListDataQuery = ({
  pageSize,
  currentPage,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.subStages,
  );

  return useQuery({
    queryKey: [
      `getSubStagesAllDatas`,
      trigger,
      pageSize,
      currentPage,
      search,
    ],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<ITableSubStageResponseTypes> => {
      const { data } = await axiosInstance.post<ITableSubStageResponseTypes>(
        CLIENT_END_POINTS.subStage.getAll,
        {
          type: SubStageQueryTypes.getTableSubStages,
          pageSize,
          currentPage,
          search,
        },
      );
      return data;
    },
  });
};

export const useGetSubStageDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const triggered = useSelector(
    (state: RootState) => state.tableTrigger.subStages,
  );

  return useQuery({
    queryKey: [`getSubStageDetailDatas_${id}`, triggered],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<ISubStageType | undefined> => {
      const { data } = await axiosInstance.post<ISubStageType>(
        CLIENT_END_POINTS.subStage.getDetail,
        { type: SubStageQueryTypes.getDetailSubStage, id },
      );
      return data;
    },
  });
};

export const useGetSubStagesOptionsListDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.subStages,
  );

  return useQuery({
    queryKey: [`getSubStagesOptionsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<ISubStageType[]>(
        CLIENT_END_POINTS.subStage.getAll,
        { type: SubStageQueryTypes.getAllSubStages },
      );
      return optionsConverters(data, "_id", "name") as T;
    },
  });
};
