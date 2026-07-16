import * as Yup from "yup";

import { ISubStageFormDataTypes } from "@/types/subStagesTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function SubStageFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<ISubStageFormDataTypes> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    materials: Yup.array()
      .min(1, t("minOneMaterial"))
      .required(t("minOneMaterial")),
    desc: Yup.string().trim().default(""),
  };

  return Yup.object().shape(baseShape) as Yup.ObjectSchema<ISubStageFormDataTypes>;
}
