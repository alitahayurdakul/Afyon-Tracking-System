export interface IReasonFormDataTypes {
  name: string;
  desc: string;
}

export interface IReasonType {
  _id: string;
  name: string;
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export type IReasonsType = Array<IReasonType>;

export interface IReasonResponseDataTypes {
  count: number;
  reasons: IReasonType[];
}
