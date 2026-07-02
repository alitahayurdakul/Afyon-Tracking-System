import { IFormFieldsType } from "@/types/formTypes";

export const CREATE_FLEET_FORM_CONSTS: IFormFieldsType = [
  {
    name: "projectId",
    type: "select",
    label: "project",
    isRequired: true,
  },
  {
    name: "trainId",
    type: "select",
    label: "trains",
    isRequired: true,
  },
  {
    name: "wagonId",
    type: "select",
    label: "wagon",
    isRequired: true,
  },
  {
    name: "additionInfo",
    type: "input",
    label: "additionInfo",
    isRequired: false,
  },
  {
    name: "workflows",
    type: "select",
    label: "workflows",
    isRequired: true,
    isMultiselect: false,
  },
];
