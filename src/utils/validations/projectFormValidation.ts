import * as Yup from "yup";

import { IProjectFormDataTypes } from "@/types/projectsTypes";

export function ProjectFormValidation(): Yup.ObjectSchema<IProjectFormDataTypes> {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    code: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    status: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    desc: Yup.string().trim().default(""),
  });
}
