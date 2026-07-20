import * as Yup from "yup";

import { ITrainFormDataTypes } from "@/types/trainsTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function TrainFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<ITrainFormDataTypes> {
  const baseShape = {
    trainSetNo: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    wagons: Yup.array()
      .min(2, t("minTwoWagonSelection"))
      .required(t("required")),
    desc: Yup.string().trim().default(""),
  };

  return Yup.object().shape(baseShape);
}
