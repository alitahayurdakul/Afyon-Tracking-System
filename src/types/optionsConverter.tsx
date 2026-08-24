import { IOptionType } from "./formTypes";

/**
 * Builds select options from a list. Callers pass query data that is undefined
 * until the fetch resolves (e.g. `optionsConverters(data?.wagons, ...)`), so a
 * non-array input must yield an empty list rather than throwing — an unguarded
 * `.map` here took the whole page down.
 */
export const optionsConverters = (
  data: any,
  valueKey: string,
  labelKey: string,
): IOptionType[] => {
  if (!Array.isArray(data)) return [];

  return data
    .map((item: any) => ({
      value: item?.[valueKey],
      label: item?.[labelKey],
    }))
    .filter((option: IOptionType) => option.value && option.label);
};
