import * as Yup from "yup";

import { IProfileFormTypes } from "@/types/profileTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function ProfileInfoFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IProfileFormTypes> {
  const baseShape = {
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
    // department: Yup.string()
    //   .trim()
    //   .typeError(t("required"))
    //   .required(t("required")),
    role: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    isActive: Yup.boolean().required(),
  };

  return Yup.object().shape(baseShape);
}
