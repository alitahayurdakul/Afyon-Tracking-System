import * as Yup from "yup";

import { IWagonFormDataTypes } from "@/types/wagonsTypes";

export function WagonFormValidation(): Yup.ObjectSchema<IWagonFormDataTypes> {
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
