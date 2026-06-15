import { IFormFieldsType } from "@/types/formTypes";

export const CREATE_FLEET_FORM_CONSTS: IFormFieldsType = [
  {
    name: "projectId",
    type: "select",
    label: "Proje",
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
    label: "Tren",
    isRequired: true,
  },
  {
    name: "vagonId",
    type: "select",
    label: "Vagon",
    isRequired: true,
  },
  {
    name: "additionInfo",
    type: "input",
    label: "Ek Bilgi",
    isRequired: false,
  },
  {
    name: "workflows",
    type: "select",
    label: "Kayıtlı İş Akışları",
    isRequired: true,
    isMultiselect: false,
  },
];
