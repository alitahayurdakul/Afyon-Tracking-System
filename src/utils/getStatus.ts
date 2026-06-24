import { STATUS } from "@/consts/options";
import { IStatusType } from "@/types/commonTypes";

export const getStatus = (s: string) => {
  return (
    STATUS.find((status: IStatusType) => status.code === s)?.valueKey ?? "-"
  );
};
