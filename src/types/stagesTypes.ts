export interface IStageFormDataTypes {
  name: string;
  description: string;
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
}

export interface IStageResponseDataTypes {
  count: number,
  stages: Array<IStageType>
}
