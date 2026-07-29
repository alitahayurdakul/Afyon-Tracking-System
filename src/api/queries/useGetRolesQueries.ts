"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationTypes } from "@/types/commonTypes";
import { optionsConverters } from "@/types/optionsConverter";
import {
  IRoleResponseDataTypes,
  IRolesType,
  IRoleType,
} from "@/types/rolesTypes";

export const useGetRolesDataQuery = ({
  pageSize,
  currentPage,
}: IPaginationTypes) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getRolesAllDatas`, trigger, pageSize, currentPage],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IRoleResponseDataTypes> => {
      const { data } = await axiosInstance.post<IRoleResponseDataTypes>(
        CLIENT_END_POINTS.role.getAll,
        { type: RoleQueryTypes.getTableRoles, pageSize, currentPage },
      );
      return data;
    },
  });
};

export const useGetRoleDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getRoleDetailDatas_${id}`, trigger],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IRoleType>(
        CLIENT_END_POINTS.role.getDetail,
        { type: RoleQueryTypes.getDetailRole, id },
      );
      return data;
    },
  });
};

export const useGetRolesOptionsQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getRolesAllOptions`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IRolesType>(
        CLIENT_END_POINTS.role.getAll,
        { type: RoleQueryTypes.getAllRoles },
      );

      const options = optionsConverters(data, "_id", "roleName");
      return options;
    },
  });
};
