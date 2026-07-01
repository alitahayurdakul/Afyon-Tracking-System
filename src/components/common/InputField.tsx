import { ChangeEvent, useState } from "react";

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
  togglePassword,
}: InputFieldProps) => {
  const [show, setShow] = useState(false);
  const inputType = togglePassword ? (show ? "text" : "password") : type;

  return (
    <div className={styles.wrapper}>
      <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      <input
        id={id}
        name={name}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${styles.input} ${togglePassword ? styles["has-toggle"] : ""}`}
        value={value}
        onChange={onChange}
      />
      {togglePassword && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
          tabIndex={-1}
        >
          <span className="material-symbols-outlined">
            {show ? "visibility_off" : "visibility"}
          </span>
        </button>
      )}
    </div>
  );
};
