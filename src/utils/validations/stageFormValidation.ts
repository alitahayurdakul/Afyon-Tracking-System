import * as Yup from "yup";

import { IStageFormDataTypes } from "@/types/stagesTypes";

export function StageFormValidation(): Yup.ObjectSchema<Omit<IStageFormDataTypes, "subStages">> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    description: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur")
  };

  return Yup.object().shape(baseShape);
}