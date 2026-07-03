import { IProcessType } from "@/types/processTypes";

export type StageProgress = {
  percent: number;
};

export const getStageProgress = (stageCount: number = 0, completedStageCount: number = 0): StageProgress => {
  const total = stageCount ?? 0;
  const completedStages = completedStageCount ?? 0;
  const percent =
    total > 0 ? Math.min(100, Math.round((completedStages / total) * 100)) : 0;

  return {
    percent,
  };
};
