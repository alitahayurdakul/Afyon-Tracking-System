import { IActiveProcessType } from "@/types/processTypes";

export type StageProgress = {
  hasProgress: boolean;
  currentStep: number;
  total: number;
  percent: number;
};

export const getStageProgress = (unit: IActiveProcessType): StageProgress => {
  const total = unit.stageCount ?? 0;
  const entries = unit.entryCount ?? 0;
  const currentStep = Math.min(entries, total);
  const percent = total > 0 ? Math.min(100, Math.round((currentStep / total) * 100)) : 0;

  return {
    hasProgress: total > 0,
    currentStep,
    total,
    percent,
  };
};
