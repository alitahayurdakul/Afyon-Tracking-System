import { ITableResponseType } from "./commonTypes";

export type ProjectStatus = "ACTIVE" | "IN_PROGRESS" | "COMPLETED";

export interface IProjectFormDataTypes {
  name: string;
  code: string;
  status: string;
  desc: string;
}

export interface IProjectType {
  _id: string;
  name: string;
  projectCode?: string;
  status: ProjectStatus;
  description: string;
  creator?: string;
  lastUpdatedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IProjectsResponseTypes extends ITableResponseType{
  data: IProjectType[];
}
