export interface MainStage {
  id: string;
  name: string;
  status: string | number;
  start: string | null;
  end: string | null;
  elapsed: string | null;
}

export interface MaterialEntry {
  name: string;
  serialNumber: string;
  materialCode: string;
  _id: string;
  description: string;
  creator?: string;
  editor?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface DelayReasons {
  _id: string;
  name: string;
}

interface SubStageInfo {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  materials?: MaterialEntry[];
}

export interface SubStage {
  _id: string;
  name: string;
  status: string | number;
  start: string | null;
  end: string | null;
  delayReasons: DelayReasons[];
  materials: MaterialEntry[];
  description: string;
  images: string[];
  subStageId: SubStageInfo;
}
