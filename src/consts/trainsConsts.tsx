import { IFormFieldsType, IOptionType } from "@/types/formTypes";
// import { getYearsOptions } from "@/utils/getYearsOptions";

// export const TRAIN_MODELS: IOptionType[] = [
//   {
//     value: "DE-22000",
//     label: "DE-22000",
//   },
//   {
//     value: "DE-24000",
//     label: "DE-24000",
//   },
//   {
//     value: "DE-33000",
//     label: "DE-33000",
//   },
//   {
//     value: "E-68000",
//     label: "E-68000",
//   },
//   {
//     value: "E-5000",
//     label: "E-5000",
//   },
//   {
//     value: "MANV-11000",
//     label: "MANV-11000",
//   },
//   {
//     value: "MANV-7000",
//     label: "MANV-7000",
//   },
//   {
//     value: "MANV-9000",
//     label: "MANV-9000",
//   },
// ];

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
