import { IFormFieldsType } from "@/types/formTypes";

export const CREATE_FLEET_FORM_CONSTS: IFormFieldsType = [
  {
    name: "projectId",
    type: "select",
    label: "project",
    options: [
      { value: "PROJECT-22000", label: "PROJECT-22000" },
      { value: "PROJECT-22001", label: "PROJECT-22001" },
      { value: "PROJECT-22002", label: "PROJECT-22002" },
    ],
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
