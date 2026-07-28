
import React, { forwardRef, useCallback } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { CheckIcon } from "@/components/icons/CheckIcon";
import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { formAnimation } from "@/utils/animationUtils";

import { ErrorLabel } from "./ErrorLabel";

import styles from "@/styles/components/formElements/TextAreaBox.module.scss";

interface TextAreaBoxProps extends UseControllerProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  error?: {
    message: string;
  };
  success?: boolean;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  control: Control<any, object>;
  changeExtraFn?: (id?: any) => void;
  resize?: "none" | "both" | "horizontal" | "vertical"; // Added resize prop
  limitMaxOneSpace?: boolean;
  visibleLimit?: boolean;
  errorLabelClassName?: string;
  charCountClassName?: string;
  trimStart?: boolean;
  isHideSuccessIcon?: boolean;
  textareaClassName?: string;
}

export type Ref = HTMLTextAreaElement;

// Maybe we can add regex controller

export const TextAreaBox = forwardRef<Ref, TextAreaBoxProps>(
  function InputBoxComponent(props, ref) {
    const { field, fieldState, formState } = useController(props);
    const { error: errorFormValidation, isDirty } = fieldState;

    const error = props.error || (formState.isSubmitted && errorFormValidation);

    const success =
      props.success === false
        ? false
        : props.success ||
          (!error &&
            !fieldState.invalid &&
            field.value !== ""  &&
            formState.isSubmitted &&
            isDirty &&
            styles["success-textarea"]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.trimStart) {
          e.currentTarget.value = e.currentTarget.value.trimStart();
        }
        if (props.limitMaxOneSpace) {
          e.currentTarget.value = e.currentTarget.value.replace(/\s{2,}/g, " ");
        }
        field.onChange(e.currentTarget.value);
        props.changeExtraFn && props.changeExtraFn(e.currentTarget.value);
      },
      [field, props]
    );

    return (
      <div
        className={`${props.className} ${styles["form-textarea-container"]} `}
      >
        <label className={styles["form-label"]} htmlFor={props.name}>
          {props.label}
          {props.required && "*"}
        </label>
        <div
          className={clsx(styles["input-container"], {
            [styles["disabled"]]: props?.disabled
          })}
        >
          <textarea
            id={props.name}
            rows={props.rows}
            cols={props.cols}
            {...field}
            ref={(element) => {
              field.ref(element);
              if (ref) {
                if (typeof ref === "function") {
                  ref(element);
                } else {
                  (ref as React.RefObject<HTMLTextAreaElement | null>).current =
                    element;
                }
              }
            }}
            onChange={handleChange}
            value={field.value || ""}
            className={`${styles["form-textarea"]} ${
              error && styles["error-textarea"]
            }
          ${success && styles["success-textarea"]}
          ${props.disabled && styles["disabled"]}
          ${props.textareaClassName &&props.textareaClassName || ""}
          `}
            style={{ resize: props.resize }}
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            maxLength={props.maxLength}
          />

          <div className={styles["extra-info-container"]}>
            {error && (
              <motion.div
                {...formAnimation}
                transition={{
                  duration: 0.2
                }}
              >
                <ErrorIcon className={styles["extra-icon"]} />
              </motion.div>
            )}
            {success && !props.isHideSuccessIcon && (
              <motion.div
                {...formAnimation}
                transition={{
                  duration: 0.2
                }}
              >
                <CheckIcon className={styles["extra-icon"]} />
              </motion.div>
            )}
          </div>
          {props.visibleLimit && props.maxLength && (
            <div
              className={clsx(styles["char-count"], props.charCountClassName)}
            >
              {(field.value && field.value?.length) || 0}/{props.maxLength}
            </div>
          )}
        </div>
        {/* Error message part */}
        <AnimatePresence>
          {error && error?.message && formState.isSubmitted && (
            <ErrorLabel
              message={error.message}
              className={props.errorLabelClassName}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);
