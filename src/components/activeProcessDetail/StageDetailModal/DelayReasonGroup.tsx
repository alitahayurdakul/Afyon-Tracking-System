import { delayReasonOptions } from "@/mock/processData";
import styles from "./StageDetailModal.module.scss";
import React from "react";
import Option from "@/components/formElements/Option";
import { DelayReasons } from "@/types/activeProcessDetailTypes";
import { IOptionType } from "@/types/formTypes";

interface DelayReasonGroupProps {
  selectedList: IOptionType["value"][];
  disabled: boolean;
  onChange: (selectedList: IOptionType["value"][]) => void;
}

export default function DelayReasonGroup({
  selectedList,
  disabled,
  onChange
}: DelayReasonGroupProps) {
  console.log(selectedList);

  const handleChange = (value: IOptionType["value"], checked: boolean) => {
    const updated = checked
      ? [...selectedList, value]
      : selectedList.filter((v) => v !== value);
    onChange(updated);
  }

  return (
    <div className={styles.checkboxGroup}>
      {delayReasonOptions.map((reason, index) => (
        <React.Fragment key={index}>
          <Option
            option={{ label: reason.name ?? "-", value: reason.id }}
            isSelected={selectedList.includes(reason.id)}
            onChange={handleChange}
            isDisabled={disabled}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
