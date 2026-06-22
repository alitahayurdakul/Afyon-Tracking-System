export interface IWagonDetail {
  name: string;
}

export interface ITrainFormDataTypes {
  trainSetNo: string;
  wagonsCount: string;
  desc: string;
  wagonDetails: IWagonDetail[];
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
  wagonDetails?: IWagonDetail[];
}

export interface ITrainResponseDataTypes {
  count: number;
  trains: Array<ITrainType>;
}
