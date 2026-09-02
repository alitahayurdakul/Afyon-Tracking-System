import * as Yup from "yup";

import { IRoleFormDataTypes } from "@/types/rolesTypes";
import { TValidationTranslator } from "@/types/validationTypes";

export function RoleFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IRoleFormDataTypes> {
  return Yup.object().shape({
    roleName: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    roleDescription: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    permissions: Yup.array()
      .of(
        Yup.object({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }).required(),
      )
      .min(1, t("minOnePermission"))
      .required(t("required")),
    preset: Yup.string().optional(),
  });
}
