import * as Yup from "yup";

import { ISubStageFormDataTypes } from "@/types/subStagesTypes";

export function SubStageFormValidation(): Yup.ObjectSchema<ISubStageFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    stage: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    order: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    desc: Yup.string().trim().default(""),
  });
}
