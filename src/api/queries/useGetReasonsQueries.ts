"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { IReasonType } from "@/types/reasonsTypes";

export const useGetReasonsDataQuery = <T>() => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.reasons,
  );

  return useQuery({
    queryKey: [`getReasonsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.reason.getAll,
        { type: ReasonQueryTypes.getAllReasons },
      );
      return data;
    },
  });
};

export const useGetTableReasonsDataQuery = <T>({
  pageSize,
  currentPage,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.reasons,
  );

  return useQuery({
    queryKey: [
      `getTableReasonsAllDatas`,
      trigger,
      pageSize,
      currentPage,
      search,
    ],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.post<T>(
        CLIENT_END_POINTS.reason.getAll,
        {
          type: ReasonQueryTypes.getTableReasons,
          pageSize,
          currentPage,
          search,
        },
      );
      return data;
    },
  });
};

export const useGetReasonDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.reasons,
  );

  return useQuery({
    queryKey: [`getReasonDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<IReasonType | undefined> => {
      const { data } = await axiosInstance.post<IReasonType>(
        CLIENT_END_POINTS.reason.getDetail,
        { type: ReasonQueryTypes.getDetailReason, id },
      );
      return data;
    },
  });
};
