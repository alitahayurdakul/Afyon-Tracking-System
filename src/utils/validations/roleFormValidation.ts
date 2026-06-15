import * as Yup from "yup";

import { IRoleFormDataTypes } from "@/types/rolesTypes";

export function RoleFormValidation(): Yup.ObjectSchema<IRoleFormDataTypes> {
  return Yup.object().shape({
    roleName: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    roleDescription: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    permissions: Yup.array()
      .of(
        Yup.object({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }).required(),
      )
      .min(1, "En az bir yetki seçiniz")
      .required("Bu alan zorunludur"),
  });
}
