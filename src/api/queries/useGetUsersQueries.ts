"use client";
import { useQuery } from "@tanstack/react-query";

// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { UserQueryTypes } from "@/app/api/users/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  IUserResponseDataTypes,
  IUserType,
} from "@/types/usersTypes";
import { mockUsers, mockUsersResponse } from "@/mock/managementData";

export const useGetUsersDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getUsersAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IUserResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IUserResponseDataTypes>(
      //   CLIENT_END_POINTS.user.getAll,
      //   { type: UserQueryTypes.getAllUsers },
      // );
      // return data;
      return mockUsersResponse;
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
    queryFn: async (): Promise<IUserType | undefined> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IUserType>(
      //   CLIENT_END_POINTS.user.getDetail,
      //   { type: UserQueryTypes.getDetailUser, id },
      // );
      // return data;
      return mockUsers.find((user) => user._id === id);
    },
  });
};
