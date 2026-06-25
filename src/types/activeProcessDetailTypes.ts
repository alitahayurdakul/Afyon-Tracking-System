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
  serial: string;
}

export interface DelayReasons{
  id: string;
  name: string;
}

export interface SubStage {
  id: string;
  name: string;
  status: string | number;
  start: string | null;
  end: string | null;
  delayReasons: DelayReasons[];
  materials: MaterialEntry[];
  description: string;
  images: string[];
}

export interface StageDetail {
  stageId: string;
  stageName: string;
  subStages: SubStage[];
}
