export interface IWagonFormDataTypes {
  name: string;
  desc: string;
}

export interface IWagonType {
  _id: string;
  name: string;
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IWagonResponseDataTypes {
  count: number;
  wagons: IWagonType[];
}
