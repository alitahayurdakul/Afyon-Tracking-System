import * as Yup from "yup";

import { IUserEditFormDataTypes, IUserFormDataTypes } from "@/types/usersTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function UserFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IUserFormDataTypes> {
  return Yup.object().shape({
    fullname: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    email: Yup.string()
      .trim()
      .email(t("invalidEmail"))
      .typeError(t("required"))
      .required(t("required")),
    pwd: Yup.string()
      .min(6, t("passwordMin", { min: 6 }))
      .typeError(t("required"))
      .required(t("required")),
    phone: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    department: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    role: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    isActive: Yup.boolean().required(),
  });
}

export function UserEditFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IUserEditFormDataTypes> {
  return Yup.object().shape({
    fullname: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    email: Yup.string()
      .trim()
      .email(t("invalidEmail"))
      .typeError(t("required"))
      .required(t("required")),
    phone: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    department: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    role: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    isActive: Yup.boolean().required(),
  });
}
