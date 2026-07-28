import { ITableResponseType } from "./commonTypes";

export interface IWagonFormDataTypes {
  name: string;
  desc: string;
}

export interface IWagonType {
  _id: string;
  wagonNo: string;
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export type IWagonsType = Array<IWagonType>

export interface IWagonResponseDataTypes {
  count: number;
  wagons: IWagonType[];
}

export interface IWagonTableResponseDataTypes extends ITableResponseType {
  data: IWagonsType;
}
