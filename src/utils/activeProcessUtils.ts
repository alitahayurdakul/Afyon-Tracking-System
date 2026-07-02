import { IProcessType } from "@/types/processTypes";

export type StageProgress = {
  percent: number;
};

export const getStageProgress = (unit: IProcessType): StageProgress => {
  const total = unit.stageCount ?? 0;
  const completedStages = unit.completedStageCount ?? 0;
  const percent =
    total > 0 ? Math.min(100, Math.round((completedStages / total) * 100)) : 0;

  return {
    percent,
  };
};
