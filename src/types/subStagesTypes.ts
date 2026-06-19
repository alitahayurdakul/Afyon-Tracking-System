export interface ISubStageFormDataTypes {
  name: string;
  stage: string;
  order: string;
  desc: string;
}

export interface ISubStageType {
  _id: string;
  name: string;
  stageId: string;
  stageName?: string;
  order: number;
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
