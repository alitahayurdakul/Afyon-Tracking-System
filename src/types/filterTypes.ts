import { CLIENT_END_POINTS } from "@/consts/endpoints";

import { IOptionType } from "./formTypes";

export interface IFilterType {
  name: string;
  label: string;
  placeholder: string;
  isMultiSelect: boolean;
  apiKey?: keyof typeof CLIENT_END_POINTS.common;
  options?: IOptionType[];
  subValues?: string[];
  savedProperty?: "label" | "value";
  isDisabled?: boolean;
  apiUrl?: string;
  queryType?: string;
  isClearable?: boolean;
  key: "value" | "label";
  multiLabel?: string;
  type: "select" | "date";
}
