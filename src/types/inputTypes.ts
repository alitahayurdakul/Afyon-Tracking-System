import { HTMLInputTypeAttribute } from "react";

export interface IInputField {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  icon: string;
  autoComplete?: string;
  togglePassword?: boolean;
}
