import * as Yup from "yup";

import { IProfileFormTypes } from "@/types/profileTypes";

export function ProfileInfoFormValidation(): Yup.ObjectSchema<IProfileFormTypes> {
  const baseShape = {
    fullName: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    email: Yup.string()
      .trim()
      .email("Geçerli bir e-posta giriniz")
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    phone: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    department: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    role: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    isActive: Yup.boolean().required(),
  };

  return Yup.object().shape(baseShape);
}
