import { ITableResponseType } from "./commonTypes";
import { IOptionType } from "./formTypes";
import { IMaterialType } from "./materialsTypes";
import { ISubStageType } from "./subStagesTypes";

export interface IStageFormDataTypes {
  name: string;
  description: string;
  subStages?: IOptionType[];
}

export interface IStageType {
  _id: string;
  name: string;
  description: string;
  creator: string;
  editor?: string;
  isActive?: boolean;
  plannedOrder?: number;
  materials?: IMaterialType[];
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  subStages?: ISubStageType[] | IOptionType[];
}

export interface IStageResponseDataTypes {
  count: number;
  stages: Array<IStageType>;
}

export type IStagesTypes = Array<IStageType>;

export interface IStageTableResponseDataTypes extends ITableResponseType {
  data: IStagesTypes;
}
