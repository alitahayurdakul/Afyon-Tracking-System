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
}

export interface DelayReasons{
  id: string;
  name: string;
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
}
