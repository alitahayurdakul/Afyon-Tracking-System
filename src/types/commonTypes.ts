import { useTranslations } from "next-intl";

export interface IStatusType{
    code: number | string;
    valueKey: string;
};

export type IStatusTypes = Array<IStatusType>;
export type TFunction = ReturnType<typeof useTranslations>;