import { IFormFieldsType } from "@/types/formTypes";

export const STAGE_FORM_CONSTS: IFormFieldsType = [
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
    name: "hasSubStage",
    type: "checkbox",
    label: "Alt aşama bulunmaktadır."
  },
  {
    name: "subStages",
    type: "select",
    label: "Alt Aşama",
    // isRequired: true,
  },
  {
    name: "materialList",
    type: "select",
    label: "Malzeme Listesi",
    isMultiselect: true
  }
];

export const EDIT_STAGE_FORM_CONSTS: IFormFieldsType = [
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
