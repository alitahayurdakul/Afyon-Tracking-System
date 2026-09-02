import { Permission } from "@/consts/permissions";

import { ITableResponseType } from "./commonTypes";

export interface IRoleFormDataTypes {
  roleName: string;
  roleDescription: string;
  permissions: { label: string; value: string }[];
  preset?: string;
}

export interface IRoleType {
  _id: string;
  roleName: string;
  roleDescription: string;
  permissions: Permission[];
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export type IRolesType = Array<IRoleType>;

export interface IRoleResponseDataTypes extends ITableResponseType {
  data: IRoleType[];
}
