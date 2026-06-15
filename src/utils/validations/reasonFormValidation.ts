import * as Yup from "yup";

import { IReasonFormDataTypes } from "@/types/reasonsTypes";

export function ReasonFormValidation(): Yup.ObjectSchema<IReasonFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    desc: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
  });
}
