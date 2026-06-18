import { IInputField } from "@/types/inputTypes";

export const USERNAME_FIELD: IInputField = {
  id: "username",
  name: "username",
  type: "text",
  placeholder: "Kullanıcı adı giriniz",
  icon: "person",
  autoComplete: "username",
};

export const PASSWORD_FIELD: IInputField = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "••••••••",
  icon: "lock",
  autoComplete: "current-password",
};
