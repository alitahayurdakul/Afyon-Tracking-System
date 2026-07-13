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
  creator: "melih";
  editor: "Admin";
  isActive: true;
  createdAt: "2026-06-29T11:24:36.492Z";
  updatedAt: "2026-07-07T21:18:04.837Z";
  __v: 0;
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
