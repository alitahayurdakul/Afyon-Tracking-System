import {
  faBuilding,
  faEnvelope,
  faIdBadge,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { IFormFieldsType } from "@/types/formTypes";

export const PROFILE_FORM_CONSTS: IFormFieldsType = [
  {
    name: "fullName",
    type: "input",
    label: "fullName",
    isRequired: true,
    maxLength: 100,
    regex: /[^A-Za-zçğışöüÖÜŞZÇĞİ ]/g,
    icon: faUser,
  },
  {
    name: "email",
    type: "email",
    label: "email",
    isRequired: true,
    icon: faEnvelope,
  },
  {
    name: "phone",
    type: "phoneInput",
    label: "phone",
    isRequired: true,
    icon: faPhone,
    onlyNumber: true
  },
  {
    name: "role",
    type: "select",
    label: "role",
    isRequired: true,
    icon: faIdBadge,
  },
  {
    name: "department",
    type: "select",
    label: "department",
    isRequired: true,
    icon: faBuilding,
  },
  { name: "status", type: "checkbox", label: "status" },
];

export const PASSWORD_FORM_CONSTS: IFormFieldsType = [
  {
    name: "password",
    type: "input",
    label: "newPassword",
    isRequired: true,
  },
  {
    name: "repassword",
    type: "password",
    label: "repassword",
    isRequired: true,
  },
];
