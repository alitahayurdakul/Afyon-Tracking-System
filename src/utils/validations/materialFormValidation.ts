import * as Yup from "yup";

import { IMaterialFormDataTypes } from "@/types/materialsTypes";

export function MaterialFormValidation(): Yup.ObjectSchema<IMaterialFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    code: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    desc: Yup.string().trim().default(""),
  });
}
