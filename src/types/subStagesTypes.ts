import { IOptionType } from "./formTypes";

export interface ISubStageMaterial {
  value: string;
  label: string;
}

export interface ISubStageFormDataTypes {
  name: string;
  materials: IOptionType[];
  desc: string;
}

export interface ISubStageType {
  _id: string;
  name: string;
  materials: ISubStageMaterial[];
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ISubStageResponseDataTypes {
  count: number;
  subStages: ISubStageType[];
}
