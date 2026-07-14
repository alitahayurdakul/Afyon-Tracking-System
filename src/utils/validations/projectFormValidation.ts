import * as Yup from "yup";

import { IProjectFormDataTypes } from "@/types/projectsTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function ProjectFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IProjectFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    code: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    status: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    desc: Yup.string().trim().default(""),
  });
}
