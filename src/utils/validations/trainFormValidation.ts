import * as Yup from "yup";

import { ITrainFormDataTypes } from "@/types/trainsTypes";

export function TrainFormValidation(): Yup.ObjectSchema<ITrainFormDataTypes> {
  const baseShape = {
    trainSetNo: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    wagonsCount: Yup.string()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    desc: Yup.string().trim().default(""),
    wagonDetails: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .trim()
            .typeError("Bu alan zorunludur")
            .required("Bu alan zorunludur"),
        })
      )
      .default([]),
  };

  return Yup.object().shape(baseShape);
}