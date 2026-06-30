import { IOptionType } from "./formTypes";

export interface IWagonDetail {
  _id: string;
  wagonNo: string;
  trainIds: string[];
  description: string;
  order: number;
  isActive: boolean;
}

export interface ITrainFormDataTypes {
  trainSetNo: string;
  desc: string;
  wagons: IOptionType[];
}

export interface ITrainType {
  _id: string;
  trainSetNo: string;
  desc?: string;
  trainModel?: string;
  year?: number;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
  wagons?: IWagonDetail[];
}

export type ITrainsType = Array<ITrainType>;
