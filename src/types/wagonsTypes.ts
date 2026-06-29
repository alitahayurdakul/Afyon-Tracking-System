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
