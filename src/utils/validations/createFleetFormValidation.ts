import * as Yup from "yup";

import { ICreateFleetFormDataTypes } from "@/types/createFleetTypes";

export function CreateFleetFormValidation(): Yup.ObjectSchema<
  Omit<ICreateFleetFormDataTypes, "additionInfo" | "wagonId">
> {
  const baseShape = {
    projectId: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    trainId: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    workflows: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
  };

  return Yup.object().shape(baseShape);
}
