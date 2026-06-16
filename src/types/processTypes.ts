export interface IStageEntryType {
    operator: string;
    stageId: string;
    stageName: string;
    startedAt: string;
}

export interface IActiveProcessType {
    _id: string;
    locomotiveNo: string;
    fleetOwner: string;
    workflowId?: string;
    workflowName?: string;
    creator: string;
    status: "COMPLETED" | "ACTIVE" | string;
    currentStageId: string | null;
    completedAt: string;
    startedAt: string;
    createdAt: string;
    updatedAt: string;
    stageCount: number;
    entryCount: number;
    totalMinutes: number;
    openStage: IStageEntryType | null;
};

export type IActiveProcessesTypes = Array<IActiveProcessType>;

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
    [key: string]: unknown;
};

export type ProcessResponse = {
    entries: IProcessEntry[];
    process: IProcessInstance;
    stages: IStage[];
};