import { IOptionType } from "@/types/formTypes";

export const getYearsOptions = (isReversed?: boolean) => {
  const years: IOptionType[] = [];
  for (let i = 2000; i <= 2026; i++) {
    years.push({
      value: i,
      label: i.toString(),
    });
  }
  return isReversed ? years.reverse() : years;
};
