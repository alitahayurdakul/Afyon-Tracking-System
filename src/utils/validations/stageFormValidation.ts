import * as Yup from "yup";

import { IStageFormDataTypes } from "@/types/stagesTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function StageFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IStageFormDataTypes> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    description: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    subStages: Yup.array()
      .min(1, t("minOneSelection"))
      .required(t("minOneSelection")),
  };

  return Yup.object().shape(baseShape);
}
