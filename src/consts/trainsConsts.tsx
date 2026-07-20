import { IFormFieldsType } from "@/types/formTypes";

export const TRAIN_FORM_CONSTS: IFormFieldsType = [
  {
    name: "trainSetNo",
    type: "input",
    label: "trainSetNo",
    isRequired: true,
    maxLength: 100,
  },
  {
    name: "desc",
    type: "textarea",
    label: "desc",
    isRequired: false,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "wagons",
    type: "select",
    label: "wagons",
    isMultiselect: true
  }
];

export const EDIT_TRAIN_FORM_CONSTS: IFormFieldsType = TRAIN_FORM_CONSTS;
