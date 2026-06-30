import { IOptionType } from "./formTypes";

export interface ISubStageMaterial {
  description: string;
  materialCode: string;
  name: string;
  _id: string;
}

export interface ISubStageFormDataTypes {
  name: string;
  materials: IOptionType[];
  desc: string;
}

export interface ISubStageType {
  _id: string;
  name: string;
  materials?: ISubStageMaterial[];
  description: string;
  creator?: string;
  lastUpdatedBy?: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
}

export interface ISubStageResponseDataTypes {
  count: number;
  subStages: ISubStageType[];
}
