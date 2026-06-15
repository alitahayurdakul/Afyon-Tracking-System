import * as Yup from "yup";

import { IUserFormDataTypes } from "@/types/usersTypes";

export function UserFormValidation(): Yup.ObjectSchema<IUserFormDataTypes> {
  return Yup.object().shape({
    fullname: Yup.string()
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
  });
}
