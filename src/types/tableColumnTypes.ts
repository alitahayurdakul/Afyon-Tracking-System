export interface ICommonTableColumnsType {
  name: string;
  label: string;
  size?: number;
  isSort?: boolean;
  shouldTranslate?: boolean;
  minSize?: number;
  isLink?: boolean;
  color?: string;
  isProp?: boolean;
  url?: string;
  responsiveItemClassName?: string;
  isComponent?: boolean;
  options?: string;
  type?: string;
  groupItems?: ICommonTableColumnsType[];
  isFormattable?:
    | "formattableAsNumber"
    | "formattableAsPrice"
    | "formattableAsNumberWithLimit";
  nonOverflow?: boolean;
  //   styles?: any;
  valueClassName?: string;
  propertyNameClassName?: string;
  //   optionsType?: DashboardOptionsTypeEnums;
}

export type ICommonTableColumnsTypes =
  Array<ICommonTableColumnsType>;

export interface ICommonStatusTypes {
  key: number | string;
  label: string;
  color?: string;
  value?: string;
}
