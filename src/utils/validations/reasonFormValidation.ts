import * as Yup from "yup";

import { IReasonFormDataTypes } from "@/types/reasonsTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function ReasonFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IReasonFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    desc: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
  });
}
