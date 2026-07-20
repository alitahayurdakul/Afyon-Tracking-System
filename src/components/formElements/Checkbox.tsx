'use client';
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { forwardRef, useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import styles from "@/styles/components/formElements/Checkbox.module.scss";

import { ErrorLabel } from "./ErrorLabel";

interface CheckBoxProps extends UseControllerProps {
  name: string;
  label: any;
  className?: string;
  classNameLabel?: string;
  required?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  align?: "center" | "top" | "bottom";
  ruleExtra?: { [key: string]: any };
  clickFn?: () => void;
  errorClassName?: string;
  changeExtraFn?: (id?: any) => void;
  classNameInput?: string;
}

export type Ref = HTMLInputElement;

export const CheckBox = forwardRef<Ref, CheckBoxProps>(
  function CheckBoxComponent(
    {
      name,
      className,
      label,
      required,
      defaultChecked = false,
      control,
      shouldUnregister,
      rules,
      disabled,
      classNameLabel,
      align,
      clickFn,
      errorClassName,
      changeExtraFn,
      classNameInput
    }
  ) {
    const { field, fieldState, formState } = useController({
      name,
      control,
      defaultValue: defaultChecked,
      shouldUnregister,
      rules
    });

    const { error } = fieldState;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e.target.checked);
        changeExtraFn && changeExtraFn(e.target.checked);
      },
      [changeExtraFn, field]
    );

    return (
      <div className={styles["checkbox-wrapper"]} >
        <div
          className={`${className} ${styles[align || "top"]} ${
            styles.container
          } ${disabled ? styles["disable-container"] : ""}`}
        >
          <input
            {...field}
            className={`${
              error && styles["error-input"]
            } ${classNameInput || ""} ${styles["check-input"]}`}
            onClick={() => {
              clickFn && clickFn();
            }}
            onChange={handleChange}
            name={name}
            // defaultChecked={defaultChecked} // no need for this because it is controlled component
            type="checkbox"
            disabled={disabled}
            checked={field.value}
          />
          <label className={clsx(styles["default-label"], {
            [classNameLabel as string]: classNameLabel
          })}>
            {label} {required && "*"}
          </label>
        </div>
        {/* Error message part */}
        <AnimatePresence>
          {error && error?.message && formState.isSubmitted && (
            <ErrorLabel
              type="checkbox"
              message={error.message}
              className={errorClassName}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);
