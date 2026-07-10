import { IOptionType } from "@/types/formTypes";
import { ResponseStatusEnums, StatusEnums } from "@/utils/enum/commonEnums";

export const PROJECT_STATUS_OPTIONS: IOptionType[] = [
  { label: StatusEnums.active, value: ResponseStatusEnums.active, color: "active" },
  { label: StatusEnums.completed, value: ResponseStatusEnums.completed, color: "completed" },
  { label: StatusEnums.passive, value: ResponseStatusEnums.passive, color: "on-sale-badge" },
];