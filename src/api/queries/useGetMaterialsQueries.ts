"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { MaterialQueryTypes } from "@/app/api/materials/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IOptionType } from "@/types/formTypes";
import { IMaterialsType, IMaterialType } from "@/types/materialsTypes";
import { optionsConverters } from "@/types/optionsConverter";

export const useGetMaterialsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getMaterialsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IMaterialsType> => {
      const { data } = await axiosInstance.post<IMaterialsType>(
        CLIENT_END_POINTS.material.getAll,
        { type: MaterialQueryTypes.getAllMaterials },
      );
      return data;
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
      const { data } = await axiosInstance.post<IMaterialType>(
        CLIENT_END_POINTS.material.getDetail,
        { type: MaterialQueryTypes.getDetailMaterial, id },
      );
      return data;
    },
  });
};

export const useGetMaterialsOptionsDataQuery = () => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.triggerTrainTableTrigger,
  );

  return useQuery({
    queryKey: [`getMaterialsAllDatas`, trigger],
    refetchOnWindowFocus: false,
    enabled: true,
    queryFn: async (): Promise<IOptionType[]> => {
      const { data } = await axiosInstance.post<IMaterialsType>(
        CLIENT_END_POINTS.material.getAll,
        { type: MaterialQueryTypes.getAllMaterials },
      );

      const materialOptions: IOptionType[] = optionsConverters(
        data || [],
        "_id",
        "name",
      );

      return materialOptions;
    },
  });
};
