import * as Yup from "yup";

import { IMaterialFormDataTypes } from "@/types/materialsTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function MaterialFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IMaterialFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    code: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    desc: Yup.string().trim().default(""),
  });
}
