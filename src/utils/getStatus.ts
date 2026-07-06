import { STATUS } from "@/consts/options";
import { IStatusType } from "@/types/commonTypes";

export const getStatus = (s: string | number = "", optionsValue: "code" | "value" | undefined = "code") => {
  return (
    STATUS.find((status: IStatusType) => status[optionsValue] === s.toString())?.valueKey ?? "-"
  );
};
