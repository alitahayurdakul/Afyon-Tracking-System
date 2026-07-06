import React from "react";

import { useGetReasonsDataQuery } from "@/api/queries/useGetReasonsQueries";
import Option from "@/components/formElements/Option";
import { DelayReasons } from "@/types/activeProcessDetailTypes";
import { IOptionType } from "@/types/formTypes";
import { IReasonsType } from "@/types/reasonsTypes";

import styles from "./StageDetailModal.module.scss";

interface DelayReasonGroupProps {
  reasonList: IOptionType["value"][];
  disabled?: boolean;
  onChange: (selectedList: IOptionType["value"][]) => void;
}

export default function DelayReasonGroup({
  reasonList,
  disabled,
  onChange
}: DelayReasonGroupProps) {

  const {data: delayReasonsData} = useGetReasonsDataQuery();

  const handleChange = (value: IOptionType["value"], checked: boolean) => {
    const updated = checked
      ? [...reasonList, value]
      : reasonList.filter((v) => v !== value);
    onChange(updated);
  }

  return (
    <div className={styles.checkboxGroup}>
      {delayReasonsData?.map((reason, index) => (
        <React.Fragment key={index}>
          <Option
            option={{ label: reason.name ?? "-", value: reason._id }}
            isSelected={reasonList.includes(reason._id)}
            onChange={handleChange}
            isDisabled={disabled}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
