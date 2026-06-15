export interface ITrainFormDataTypes {
  trainSetNo: string;
  trainModel: string;
  year: string;
  desc: string;
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
}

export interface ITrainResponseDataTypes {
  count: number;
  trains: Array<ITrainType>;
}
