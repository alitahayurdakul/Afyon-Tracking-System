import { IOptionType } from "@/types/formTypes";

export const PROJECT_STATUS_OPTIONS: IOptionType[] = [
  { label: "Planlandı", value: "PLANNED" },
  { label: "Devam Ediyor", value: "IN_PROGRESS" },
  { label: "Tamamlandı", value: "COMPLETED" },
];

export const PROJECT_STATUS_LABEL_MAP = new Map<string, string>(
  PROJECT_STATUS_OPTIONS.map((option) => [
    String(option.value),
    option.label as string,
  ]),
);
