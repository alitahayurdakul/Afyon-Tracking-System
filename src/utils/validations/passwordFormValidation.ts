import * as Yup from "yup";

import { IPasswordFormTypes } from "@/types/profileTypes";

export function PasswordFormValidation(): Yup.ObjectSchema<IPasswordFormTypes> {
  const baseShape = {
    password: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    repassword: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur")
      .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor"),
  };

  return Yup.object().shape(baseShape);
}
