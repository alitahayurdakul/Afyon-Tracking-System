import { IOptionType } from "./formTypes";

export interface IStageFormDataTypes {
  name: string;
  description: string;
  subStages?: IOptionType[];
}

export interface IStageType{
   _id: string;
  name: string;
  description: string;
  creator: string;
  editor?: string;

  isActive?: boolean;
  plannedOrder?: number;

  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  subStages?: IStageType[] | IOptionType[];
}

export interface IStageResponseDataTypes {
  count: number,
  stages: Array<IStageType>
}

export type IStagesTypes = Array<IStageType>;
