import React from "react";

import { useGetReasonsDataQuery } from "@/api/queries/useGetReasonsQueries";
import Option from "@/components/formElements/Option";
import { DelayReasons } from "@/types/activeProcessDetailTypes";
import { IOptionType } from "@/types/formTypes";

import styles from "./StageDetailModal.module.scss";

interface DelayReasonGroupProps {
  reasonList: DelayReasons[];
  disabled?: boolean;
  isOnlyText?: boolean;
  onChange: (selectedList: DelayReasons[]) => void;
}

export default function DelayReasonGroup({
  reasonList,
  disabled,
  onChange,
  isOnlyText,
}: DelayReasonGroupProps) {
  const { data: delayReasonsData } = useGetReasonsDataQuery();

  const handleChange = (value: IOptionType["value"], checked: boolean) => {
    if (checked) {
      const selectedReason = delayReasonsData?.find((r) => r._id === value);
      if (!selectedReason) return;
      onChange([
        ...reasonList,
        { _id: selectedReason._id, name: selectedReason.name },
      ]);
    } else {
      onChange(reasonList.filter((r) => r._id !== value));
    }
  };

  return (
    <div className={styles.checkboxGroup}>
      {isOnlyText &&
        reasonList.map((reason, index) => (
          <React.Fragment key={index}>
            <div className={styles.reasonRow}>
              <p>
                {index + 1}-{")"}
              </p>
              <p>{reason.name}</p>
            </div>
          </React.Fragment>
        ))}

      {!isOnlyText &&
        delayReasonsData?.map((reason, index) => (
          <React.Fragment key={index}>
            <Option
              option={{ label: reason.name ?? "-", value: reason._id }}
              isSelected={reasonList.some((r) => r._id === reason._id)}
              onChange={handleChange}
              isDisabled={disabled}
            />
          </React.Fragment>
        ))}
    </div>
  );
}
