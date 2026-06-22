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
    label: "Tren No",
    isRequired: true,
    maxLength: 100,
  },
  // {
  //   name: "trainModel",
  //   type: "select",
  //   label: "Model",
  //   placeholder: "Model seçiniz",
  //   options: TRAIN_MODELS,
  //   isRequired: true,
  // },
  // {
  //   name: "year",
  //   type: "select",
  //   label: "Üretim Yılı",
  //   placeholder: "Üretim Yılını Seçiniz",
  //   options: getYearsOptions(true),
  //   isRequired: true,
  // },
  {
    name: "desc",
    type: "textarea",
    label: "Açıklama",
    isRequired: false,
    maxLength: 400,
    maxRows: 5,
  },
  {
    name: "wagonsCount",
    type: "input",
    label: "Vagon Sayısı",
    isRequired: true,
    onlyNumber: true
  }
];

export const EDIT_TRAIN_FORM_CONSTS: IFormFieldsType = TRAIN_FORM_CONSTS;
