export interface IUserFormDataTypes {
  fullname: string;
  email: string;
  pwd: string;
  phone: string;
  department: string;
  role: string;
  isActive: boolean;
}

export interface IUserEditFormDataTypes {
  fullname: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  isActive: boolean;
}

export interface IUserRoleRef {
  _id: string;
  roleName: string;
  permissions?: string[];
}

export interface IUserType {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  department: string;
  role: IUserRoleRef | string;
  isActive: boolean;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IUserResponseDataTypes {
  count: number;
  users: IUserType[];
}
