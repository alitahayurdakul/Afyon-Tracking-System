import * as Yup from "yup";

import { TValidationTranslator } from "@/types/validationTypes";
import { IWagonFormDataTypes } from "@/types/wagonsTypes";

export function WagonFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IWagonFormDataTypes> {
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
