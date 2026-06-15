import React from "react";

import { IOptionType } from "@/types/formTypes";

import { useModuleQuery } from "./queries/useCommonQueries";

interface IDataProvider {
  apiUrl: string;
  isEnable?: boolean;
  children: (
    data: IOptionType[],
    isLoading?: boolean,
    error?: boolean,
    apiUrl?: string
  ) => React.JSX.Element;
  extraParams?: {
    [key: string]: string | number | undefined;
  };
}

const DataProviderComponent = ({
  children,
  apiUrl,
  extraParams,
  isEnable = true
}: IDataProvider) => {

  const { data, isError, isLoading, isFetching } = useModuleQuery(
    apiUrl,
    isEnable,
    extraParams
  );

  if (isError) return children([], isLoading || isFetching, isError, apiUrl);

  if (isLoading)
    return children(data || [], isLoading || isFetching, isError, apiUrl);

  return children(data || []);
};

export const DataProvider = React.memo(DataProviderComponent);
