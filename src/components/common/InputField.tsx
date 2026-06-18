import { ChangeEvent } from "react";

import styles from "@/styles/components/common/InputField.module.scss";
import { IInputField } from "@/types/inputTypes";

interface InputFieldProps extends IInputField {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  id,
  name,
  type,
  placeholder,
  icon,
  autoComplete,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
