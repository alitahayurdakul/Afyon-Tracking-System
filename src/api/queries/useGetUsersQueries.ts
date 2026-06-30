"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { UserQueryTypes } from "@/app/api/users/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IUsersType, IUserType } from "@/types/usersTypes";

export const useGetUsersDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getUsersAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IUsersType>(
        CLIENT_END_POINTS.user.getAll,
        { type: UserQueryTypes.getAllUsers },
      );
      return data;
    },
  });
};

export const useGetUserDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getUserDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IUserType>(
        CLIENT_END_POINTS.user.getDetail,
        { type: UserQueryTypes.getDetailUser, id },
      );
      return data;
    },
  });
};
