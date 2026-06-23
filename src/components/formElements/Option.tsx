import clsx from "clsx";
import React from "react";

import styles from "@/styles/components/formElements/Option.module.scss";
import { IOptionType } from "@/types/formTypes";

interface IPropsType {
  option: IOptionType;
  className?: string;
  isRadioContainer?: boolean;
  isSelected?: boolean;
  code?: string;
  name?: string;
  isMobile?: boolean;
  onChange?: (value: IOptionType["value"], checked: boolean) => void;
  isDisabled?: boolean;
}

const Option = ({
  option,
  className,
  isRadioContainer,
  isSelected,
  code,
  name,
  isMobile,
  onChange,
  isDisabled
}: IPropsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(option.value, e.target.checked);
  };

  return (
    <div
      className={clsx(styles["single-option-section"], {
        [className as string]: className,
      })}
    >
      <input
        type="checkbox"
        id={option.value as string}
        checked={isSelected}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <label
        className={clsx(
          isMobile ? styles["mobile-label"] : styles["desktop-label"],
        )}
        htmlFor={option.value as string}
      >
        {option.label}
      </label>
    </div>
  );
};

export default Option;