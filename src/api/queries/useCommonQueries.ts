'use client';
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { axiosInstance } from "../axiosInstance";
import { IOptionType } from "@/types/formTypes";

export const useModuleQuery = (
  apiUrl: string,
  enabled: boolean,
  extraParams?: { [key: string]: string | number | undefined },
) => {

  return useQuery<IOptionType[]>({
    queryKey: [`module_${apiUrl}`, extraParams, apiUrl],
    enabled: enabled,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      const { data } = await axiosInstance.get<IOptionType[] | []>(
        apiUrl,
        // `${url}?` +
        //   new URLSearchParams({
        //     ...extraParams
        //   }),
      );

      return data;
    },
  });
};
