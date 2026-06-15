import * as Yup from "yup";

import { ICreateFleetFormDataTypes } from "@/types/createFleetTypes";

export function CreateFleetFormValidation(): Yup.ObjectSchema<ICreateFleetFormDataTypes> {
  const baseShape = {
    trainId: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    process: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    trainModal: Yup.string().optional(),
  };

  return Yup.object().shape(baseShape);
}
