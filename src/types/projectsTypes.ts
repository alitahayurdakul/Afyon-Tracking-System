export type ProjectStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED";

export interface IProjectFormDataTypes {
  name: string;
  code: string;
  status: string;
  desc: string;
}

export interface IProjectType {
  _id: string;
  name: string;
  code: string;
  status: ProjectStatus;
  description: string;
  creator?: string;
  editor?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IProjectResponseDataTypes {
  count: number;
  projects: IProjectType[];
}
