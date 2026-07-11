import { Permission } from "@/consts/permissions";

export interface IRoleFormDataTypes {
  roleName: string;
  roleDescription: string;
  permissions: { label: string; value: string }[];
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

export interface IRoleResponseDataTypes {
  count: number;
  roles: IRoleType[];
}
