"use client";
import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { RoleQueryTypes } from "@/app/api/roles/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { mockRoles, mockRolesResponse } from "@/mock/managementData";
import { RootState } from "@/redux/store";
import { IRoleResponseDataTypes, IRoleType } from "@/types/rolesTypes";

export const useGetRolesDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getRolesAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IRoleResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IRoleResponseDataTypes>(
      //   CLIENT_END_POINTS.role.getAll,
      //   { type: RoleQueryTypes.getAllRoles },
      // );
      // return data;
      return mockRolesResponse;
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
    queryFn: async (): Promise<IRoleType | undefined> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IRoleType>(
      //   CLIENT_END_POINTS.role.getDetail,
      //   { type: RoleQueryTypes.getDetailRole, id },
      // );
      // return data;
      return mockRoles.find((role) => role._id === id);
    },
  });
};
