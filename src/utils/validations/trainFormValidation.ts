import * as Yup from "yup";

import { ITrainFormDataTypes } from "@/types/trainsTypes";

export function TrainFormValidation(): Yup.ObjectSchema<ITrainFormDataTypes> {
  const baseShape = {
    trainSetNo: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    trainModel: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    year: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur")
      .matches(/^\d{4}$/, "Geçerli bir yıl giriniz")
      .test(
        "year-range",
        "Geçerli bir yıl giriniz",
        (val) => {
          if (!val) return false;
          const n = Number(val);
          return n >= 1900 && n <= new Date().getFullYear();
        },
      ),
    desc: Yup.string().trim().default(""),
  };

  return Yup.object().shape(baseShape);
}
