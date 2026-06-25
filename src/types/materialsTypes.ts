export interface IMaterialFormDataTypes {
  name: string;
  code: string;
  desc: string;
}

export interface IMaterialType {
  _id: string;
  name: string;
  code: string;
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IMaterialResponseDataTypes {
  count: number;
  materials: IMaterialType[];
}
