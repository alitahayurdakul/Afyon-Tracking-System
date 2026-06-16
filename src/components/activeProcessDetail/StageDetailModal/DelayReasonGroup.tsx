import { delayReasonOptions } from "@/mock/processData";
import styles from "./StageDetailModal.module.scss";

interface DelayReasonGroupProps {
  selected: string[];
  disabled: boolean;
  onChange: (reasons: string[]) => void;
}

export default function DelayReasonGroup({ selected, disabled, onChange }: DelayReasonGroupProps) {
  const toggle = (reason: string) => {
    if (selected.includes(reason)) {
      onChange(selected.filter((r) => r !== reason));
    } else {
      onChange([...selected, reason]);
    }
  };

  return (
    <div className={styles.checkboxGroup}>
      {delayReasonOptions.map((reason) => (
        <label key={reason} className={styles.checkboxItem}>
          <input
            type="checkbox"
            checked={selected.includes(reason)}
            disabled={disabled}
            onChange={() => toggle(reason)}
          />
          {reason}
        </label>
      ))}
    </div>
  );
}
