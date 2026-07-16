import * as Yup from "yup";

import { IPasswordFormTypes } from "@/types/profileTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function PasswordFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IPasswordFormTypes> {
  const baseShape = {
    password: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    repassword: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required"))
      .oneOf([Yup.ref("password")], t("passwordsNotMatch")),
  };

  return Yup.object().shape(baseShape);
}
