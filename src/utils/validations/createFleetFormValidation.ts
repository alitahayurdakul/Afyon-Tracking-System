import * as Yup from "yup";

import { ICreateFleetFormDataTypes } from "@/types/createFleetTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function CreateFleetFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<Omit<ICreateFleetFormDataTypes, "additionInfo" | "wagonId">> {
  const baseShape = {
    projectId: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    trainId: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    workflows: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
  };

  return Yup.object().shape(baseShape);
}
