import { useTranslations } from "next-intl";

export interface IStatusType{
    code: number | string;
    valueKey: string;
    value: string;
};

export type IStatusTypes = Array<IStatusType>;
export type TFunction = ReturnType<typeof useTranslations>;

export interface IPaginationTypes {
  pageSize: number;
  currentPage: number;
}

export interface IPaginationWithStatus extends IPaginationTypes {
  status?: string;
}

export interface ITableResponseType{
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}