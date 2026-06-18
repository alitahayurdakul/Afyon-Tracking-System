import { IFormFieldsType } from "@/types/formTypes";

export const STAGE_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "Aşama Adı",
    isRequired: true,
    maxLength: 100
  },
  {
    name: "description",
    type: "textarea",
    label: "Açıklama",
    isRequired: true,
    maxLength: 400,
    maxRows: 5,
  }
];

export const EDIT_STAGE_FORM_CONSTS: IFormFieldsType = [
  {
    name: "name",
    type: "input",
    label: "Aşama Adı",
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
  
];