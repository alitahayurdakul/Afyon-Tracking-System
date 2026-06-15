import * as Yup from "yup";

import { IWorkflowFormDataTypes } from "@/types/workflowTypes";

export function WorkflowFormValidation(): Yup.ObjectSchema<IWorkflowFormDataTypes> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    description: Yup.string()
      .trim()
      .typeError("Bu alan zorunludur")
      .required("Bu alan zorunludur"),
    stages: Yup.array()
    .min(1, "Please select at least one option")
    .required("Selection is required"),
  };

  return Yup.object().shape(baseShape);
}
