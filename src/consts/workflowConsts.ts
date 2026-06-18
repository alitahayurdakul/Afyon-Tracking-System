import { IFormFieldsType } from "@/types/formTypes";

export const WORKFLOW_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "İş Akışı Adı",
    isRequired: true,
    maxLength: 100,
    // regex: /[^A-Za-zçğışöüÖÜŞZÇĞİ ]/g,
  },
  {
    name: "description",
    type: "textarea",
    label: "Açıklama",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "stages",
    type: "select",
    label: "Aşama",
    isRequired: true,
  },
];

export const EDIT_WORKFLOW_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "İş Akışı Adı",
    isRequired: true,
    maxLength: 100,
    regex: /[^A-Za-zçğışöüÖÜŞZÇĞİ ]/g,
  },
  {
    name: "description",
    type: "textarea",
    label: "Açıklama",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "stages",
    type: "select",
    label: "Aşama",
    isRequired: true,
  },
];
