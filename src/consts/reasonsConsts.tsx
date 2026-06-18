import { IFormFieldsType } from "@/types/formTypes";

export const REASON_FORM_CONSTS: IFormFieldsType = [
  {
    name: "desc",
    type: "textarea",
    label: "Açıklama",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  },
];

export const EDIT_REASON_FORM_CONSTS: IFormFieldsType = REASON_FORM_CONSTS;
