"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IRolesType, IRoleType } from "@/types/rolesTypes";

export const useGetRolesDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getRolesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosInstance.post<IRolesType>(
        CLIENT_END_POINTS.role.getAll,
        { type: RoleQueryTypes.getAllRoles },
      );
      return data;
    },
  });
};

export const useGetRoleDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getRoleDetailDatas_${id}`],
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
