import { IFormFieldsType } from "@/types/formTypes";

export const WORKFLOW_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "name",
    isRequired: true,
    maxLength: 100,
    // regex: /[^A-Za-zçğışöüÖÜŞZÇĞİ ]/g,
  },
  {
    name: "description",
    type: "textarea",
    label: "description",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "stages",
    type: "select",
    label: "stage",
    isRequired: true,
  },
];

export const EDIT_WORKFLOW_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "name",
    isRequired: true,
    maxLength: 100,
    regex: /[^A-Za-zçğışöüÖÜŞZÇĞİ ]/g,
  },
  {
    name: "description",
    type: "textarea",
    label: "description",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "stages",
    type: "select",
    label: "stage",
    isRequired: true,
  },
];

export const QUALITY_STAGE_ID = "6a548d7444cc81ed74b22b6a";