import { IOptionType } from "./formTypes";

export interface IWorkflowFormDataTypes {
  name: string;
  description: string;
  stages: IOptionType[];
}

export interface IStageInfoType {
  description: string;
  name: string;
  isActive: boolean;
  plannedOrder?: number;
  _id: number;
}

export interface IStageType {
  stageInfo: IStageInfoType;
  plannedOrder?: number;
}

export interface IWorkflowFormTypes extends Omit<IWorkflowResponseTypes, 'stages'> {
  stages: IOptionType[];
}

export interface IWorkflowResponseTypes {
  _id: string;
  name: string;
  description: string;
  creator: string;

  isActive: boolean;

  stages: IStageType[] | IOptionType[]; // replace with WorkflowStage[] when you define stage shape

  createdAt: string;
  updatedAt: string;
}