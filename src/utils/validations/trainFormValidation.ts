import * as Yup from "yup";

import { ITrainFormDataTypes } from "@/types/trainsTypes";

export function TrainFormValidation(): Yup.ObjectSchema<ITrainFormDataTypes> {
  const baseShape = {
    trainSetNo: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    wagons: Yup.array()
        .min(1, "Please select at least one option")
        .required("Selection is required"),
    desc: Yup.string().trim().default("")
  };

  return Yup.object().shape(baseShape);
}