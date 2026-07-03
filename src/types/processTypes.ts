export interface IStageEntryType {
    operator: string;
    stageId: string;
    stageName: string;
    startedAt: string;
    plannedOrder: number;
    canSkip: boolean;
    isSkipped: boolean;
}

export type statusType = "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface IProcessType {
  _id: string;
  projectId: string;
  projectName: string;
  trainId: string;
  locomotiveNo: string;
  wagonId: string;
  wagonNo: string;
  description: string;
  workflowId: string;
  workflowName: string;
  fleetOwner: string;
  creator: string | null;
  editor: string | null;
  status: statusType;
  currentStageId: string;
  completedAt: string | null;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  stageCount: number;
  entryCount: number;
  totalMinutes: number;
  openStage: IStageEntryType;
  completedStageCount: number;
  activeStageCount: number;
}

export interface IOpenStage {
  stageId: string;
  stageName: string;
  plannedOrder: number;
  startedAt: string;
  canSkip: boolean;
  isSkipped: boolean;
}

export type IProcessesTypes = Array<IProcessType>;

export type IdRef = {
    _id: string;
};
type StageDetail = {
    _id: string;
    name: string;
    description: string;
    plannedOrder: number;
};

export type IReasonDetail = {
    description: string;
    _id: string;
    name: string;
}

export type IProcessEntry = {
    _id: string;
    createdAt: string;
    durationMinutes: number | null;
    endedAt: string | null;
    isOpen: boolean;
    note: string;
    operator: string;
    processInstanceId: string;
    sequenceNo: number;
    stageId: StageDetail;
    startedAt: string;
    updatedAt: string;
    delayNote?: string;
    delayReasonIds?: IReasonDetail[];
};

export type IProcessInstance = {
    _id: string;
    locomotiveNo: string;
    fleetOwner: string;
    workflowId?: string;
    workflowName?: string;
    creator: string;
    status: "ACTIVE" | "COMPLETED" | string;
    currentStageId?: string | null;
    startedAt?: string;
    completedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
};

export type IStage = {
    _id: string;
    name?: string;
    order?: number;
    status: "ACTIVE" | "COMPLETED" | "PENDING" | string;
    [key: string]: unknown;
};

export type IProcessSummary = {
    totalStages: number;
    completedStageCount: number;
    activeStageCount: number;
}

export type ProcessResponse = {
    entries: IProcessEntry[];
    process: IProcessInstance;
    stages: IStage[];
    summary: IProcessSummary;
};