import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type IElementType = "input" | "select" | "textarea" | "captcha" | "file" | "checkbox" | "radio" | "phoneInput" | "email" | "password"

export interface IOptionType {
  count?: number;
  label: string;
  image?: string;
  value: string | boolean | number;
  disabled?: boolean;
  isDisabled?: boolean;
  // for country
  code?: string;
  phoneCountryCode?: string;
  flagLarge?: string;
  flagSmall?: string;
  flagMedium?: string;
  // for currency
  isDefault?:boolean;
  color?: string;
}

export interface IFormFieldType {
  name: string;
  type: IElementType;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  maxLength?: number;
  regex?: RegExp;
  maxRows?: number;
  options?: IOptionType[];
  subLabel?: string;
  onlyNumber?: boolean;
  isMultiselect?: boolean;
  selectOptionsKey?: {
    valueKey: string;
    labelKey: string;
  },
  icon?: IconDefinition;
}

export type IFormFieldsType = Array<IFormFieldType>;