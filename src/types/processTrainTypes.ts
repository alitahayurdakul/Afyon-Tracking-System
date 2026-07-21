import { IWagonDetail } from "./trainsTypes";

export interface IProcessTrainSummary {
  _id: string;
  trainSetNo: string;
  trainModel: string;
  desc: string;

  creator: string;
  createdAt: string;
  updatedAt: string;
  lastProcessAt: string;

  totalProcessCount: number;
  activeProcessCount: number;
  completedProcessCount: number;

  wagons: IWagonDetail[];
}