"use client";
import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";
// import { MaterialQueryTypes } from "@/app/api/materials/route";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { mockMaterials, mockMaterialsResponse } from "@/mock/managementData";
import { RootState } from "@/redux/store";
import {
  IMaterialResponseDataTypes,
  IMaterialType,
} from "@/types/materialsTypes";

export const useGetMaterialsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getMaterialsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IMaterialResponseDataTypes> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IMaterialResponseDataTypes>(
      //   CLIENT_END_POINTS.material.getAll,
      //   { type: MaterialQueryTypes.getAllMaterials },
      // );
      // return data;
      return mockMaterialsResponse;
    },
  });
};

export const useGetMaterialDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();

  return useQuery({
    queryKey: [`getMaterialDetailDatas_${id}`],
    refetchOnWindowFocus: false,
    enabled: splittedId === id,
    queryFn: async (): Promise<IMaterialType | undefined> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await axiosInstance.post<IMaterialType>(
      //   CLIENT_END_POINTS.material.getDetail,
      //   { type: MaterialQueryTypes.getDetailMaterial, id },
      // );
      // return data;
      return mockMaterials.find((material) => material._id === id);
    },
  });
};
