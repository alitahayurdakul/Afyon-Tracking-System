"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { MaterialQueryTypes } from "@/app/api/materials/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RootState } from "@/redux/store";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { IOptionType } from "@/types/formTypes";
import {
  IMaterialResponseDataTypes,
  IMaterialsType,
  IMaterialType,
} from "@/types/materialsTypes";
import { optionsConverters } from "@/types/optionsConverter";

export const useGetMaterialsDataQuery = ({
  pageSize,
  currentPage,
  search,
}: IPaginationWithSearch) => {
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.materials,
  );

  return useQuery({
    queryKey: [`getMaterialsAllDatas`, trigger, pageSize, currentPage, search],
    refetchOnWindowFocus: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<IMaterialResponseDataTypes> => {
      const { data } = await axiosInstance.post<IMaterialResponseDataTypes>(
        CLIENT_END_POINTS.material.getAll,
        {
          type: MaterialQueryTypes.getTableMaterials,
          pageSize,
          currentPage,
          search,
        },
      );
      return data;
    },
  });
};

export const useGetMaterialDetailDataQuery = (id: string) => {
  const searchParams = useSearchParams();
  const param = searchParams.get("modal");
  const splittedId = param?.split("_").pop();
  const trigger = useSelector(
    (state: RootState) => state.tableTrigger.materials,
  );

  return useQuery({
    queryKey: [`getMaterialDetailDatas_${id}`, trigger],
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
    (state: RootState) => state.tableTrigger.materials,
  );

  return useQuery({
    queryKey: [`getMaterialsOptionsDatas`, trigger],
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
