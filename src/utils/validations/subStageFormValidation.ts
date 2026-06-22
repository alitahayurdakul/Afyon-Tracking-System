import * as Yup from "yup";

import { ISubStageFormDataTypes } from "@/types/subStagesTypes";

export function SubStageFormValidation(): Yup.ObjectSchema<ISubStageFormDataTypes> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    materials: Yup.array()
      .min(1, "En az bir malzeme seçiniz")
      .required("En az bir malzeme seçiniz"),
    desc: Yup.string().trim().default(""),
  };

  return Yup.object().shape(baseShape) as Yup.ObjectSchema<ISubStageFormDataTypes>;
}
