import { IOptionType } from "@/types/formTypes";

export const USER_DEPARTMENT_OPTIONS: IOptionType[] = [
  { label: "ARGE", value: "ARGE" },
];

export const USER_ROLE_OPTIONS: IOptionType[] = [
  { label: "Yönetici", value: "Yönetici" },
  { label: "Operatör", value: "Operatör" },
  { label: "Teknisyen", value: "Teknisyen" },
  { label: "Gözlemci", value: "Gözlemci" },
];

export const USER_ACTIVE_OPTIONS: IOptionType[] = [
  { label: "Aktif", value: true },
  { label: "Pasif", value: false },
];
