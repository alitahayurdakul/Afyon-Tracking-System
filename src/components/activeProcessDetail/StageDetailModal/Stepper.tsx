import { SubStage } from "@/types/activeProcessDetailTypes";
import { getStatus } from "@/utils/getStatus";

import styles from "./StageDetailModal.module.scss";

interface StepperProps {
  subStages: SubStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Stepper({ subStages, activeIndex, onSelect }: StepperProps) {
  return (
    <div className={styles.stepper}>
      {subStages.map((sub, index) => {
        const status = getStatus(sub.status)
        return(
        <div
          key={sub.id}
          className={`${styles.stepItem} ${styles[status]} ${
            index === activeIndex ? styles.selected : ""
          }`}
          onClick={() => onSelect(index)}
        >
          <div className={styles.stepCircle}>
            {status === "completed" ? "✓" : index + 1}
          </div>
          <span className={styles.stepLabel}>{sub.name}</span>
        </div>
      )})}
    </div>
  );
}
