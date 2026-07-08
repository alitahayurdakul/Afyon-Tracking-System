import { IOptionType } from "@/types/formTypes";
import { StatusEnums } from "@/utils/enum/commonEnums";

export const PROJECT_STATUS_OPTIONS: IOptionType[] = [
  { label: "active", value: StatusEnums.active, color: "active" },
  { label: "completed", value: StatusEnums.completed, color: "completed" },
  { label: "passive", value: StatusEnums.passive, color: "on-sale-badge" },
];