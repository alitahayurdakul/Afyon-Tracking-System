"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { UserQueryTypes } from "@/app/api/users/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationTypes } from "@/types/commonTypes";
import { IUserResponseDataTypes, IUserType } from "@/types/usersTypes";

export const useGetUsersDataQuery = ({
  pageSize,
  currentPage,
}: IPaginationTypes) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getUsersAllDatas`, trigger, pageSize, currentPage],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IUserResponseDataTypes> => {
      const { data } = await axiosInstance.post<IUserResponseDataTypes>(
        CLIENT_END_POINTS.user.getAll,
        { type: UserQueryTypes.getAllUsers, pageSize, currentPage },
      );
      return data;
    },
  });
};

export const useGetUserDetailDataQuery = (
  id: string,
  enabled: boolean = false,
) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getUserDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id || enabled,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IUserType>(
        CLIENT_END_POINTS.user.getDetail,
        { type: UserQueryTypes.getDetailUser, id },
      );
      return data;
    },
  });
};
