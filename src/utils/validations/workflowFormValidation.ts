import * as Yup from "yup";

import { TValidationTranslator } from "@/types/validationTypes";
import { IWorkflowFormDataTypes } from "@/types/workflowTypes";

export function WorkflowFormValidation(
  t: TValidationTranslator,
): Yup.ObjectSchema<IWorkflowFormDataTypes> {
  const baseShape = {
    name: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    description: Yup.string()
      .trim()
      .typeError(t("required"))
      .required(t("required")),
    stages: Yup.array()
      .min(1, t("minOneSelection"))
      .required(t("minOneSelection")),
  };

  return Yup.object().shape(baseShape);
}
