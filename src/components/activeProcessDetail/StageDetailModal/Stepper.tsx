import { SubStage } from "@/types/process";
import styles from "./StageDetailModal.module.scss";

interface StepperProps {
  subStages: SubStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Stepper({ subStages, activeIndex, onSelect }: StepperProps) {
  return (
    <div className={styles.stepper}>
      {subStages.map((sub, index) => (
        <div
          key={sub.id}
          className={`${styles.stepItem} ${styles[sub.status]} ${
            index === activeIndex ? styles.selected : ""
          }`}
          onClick={() => onSelect(index)}
        >
          <div className={styles.stepCircle}>
            {sub.status === "completed" ? "✓" : index + 1}
          </div>
          <span className={styles.stepLabel}>{sub.name}</span>
        </div>
      ))}
    </div>
  );
}
