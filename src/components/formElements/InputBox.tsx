
import { DOMAttributes, forwardRef, useCallback, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CheckIcon } from "@/components/icons/CheckIcon";
import { EmailVerifiedIcon } from "@/components/icons/EmailVerifiedIcon";
import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { formAnimation } from "@/utils/animationUtils";
import { InputSpaceEnums } from "@/utils/enum/formEnums";

import { ErrorLabel } from "./ErrorLabel";

import styles from "@/styles/components/formElements/InputBox.module.scss";


interface InputBoxProps extends UseControllerProps {
  label: string | React.ReactElement | null;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  maxLength?: number;
  maxLengthWithoutPunctuation?: number;
  minLength?: number;
  type?: string;
  onlyNumber?: boolean;
  onlyText?: boolean;
  error?: {
    message: string;
  };
  success?: boolean;
  infoIcon?: React.ReactElement;
  disabled?: boolean;
  control: Control<any, object>;
  isEmail?: boolean;
  isEmailVerified?: boolean;
  emailVerifiedIconClassName?: string;
  changeExtraFn?: (id?: any) => void;
  blurExtraFn?: (e: React.FocusEvent<HTMLInputElement>) => string | undefined;
  regex?: RegExp;
  onChangeErrorTrigger?: boolean;
  isCompanyPersonal?: boolean;
  readonly?: boolean;
  trimValue?: boolean;
  replacementString?: string;
  visibleLimit?: boolean;
  charCountClassName?: string;
  onlyInputDisabled?: boolean;
  spacesRule?: InputSpaceEnums;
  limitComma?: boolean;
  containerAttrs?: DOMAttributes<HTMLDivElement>;
  noneZeroValue?: boolean;
  noneZeroSettableValue?: string;
  errorIconExtraClassName?: string;
  checkIconExtraClassName?: string;
  errorLabelClassName?: string;
  autoComplete?: string;
  isLocaleTrUpperCase?: boolean;
  passwordToggle?: boolean;
}

export type Ref = HTMLInputElement;

export const InputBox = forwardRef<Ref, InputBoxProps>(
  function InputBoxComponent(props, ref) {
    const { field, fieldState, formState } = useController(props);
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      props.passwordToggle && props.type === "password" && showPassword
        ? "text"
        : props.type || "text";

    const {
      error: errorFormValidation,
      isDirty
    } = fieldState;

    const isErrorVisible = props.onChangeErrorTrigger || formState.isSubmitted;

    const error = props.error || (isErrorVisible && errorFormValidation);

    // Whether the message is actually on screen. aria-describedby must agree
    // with this: pointing at an id that is not rendered leaves a dangling
    // reference, and omitting it when the message *is* shown leaves the error
    // unannounced.
    const showErrorLabel = Boolean(
      error &&
        error.message &&
        ((!props.onChangeErrorTrigger && formState.isSubmitted) ||
          props.onChangeErrorTrigger),
    );


    const success =
      props.success === false
        ? false
        : props.success ||
          (!error && !fieldState.invalid && formState.isSubmitted && isDirty);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value.trim();
        if (props.isLocaleTrUpperCase) {
          inputValue = inputValue.toLocaleUpperCase("tr");
          e.currentTarget.value = e.currentTarget.value.toLocaleUpperCase("tr");
        }

        if (props.maxLengthWithoutPunctuation) {
          const valueWithoutPunctuation = e.currentTarget.value.replace(
            /[,.]/g,
            "",
          );
          if (
            valueWithoutPunctuation.length > props.maxLengthWithoutPunctuation
          ) {
            const currentValueWithoutPunctuation =
              field.value?.replace(/[,.]/g, "") || "";
            e.currentTarget.value = field.value || "";
            inputValue = field.value || "";
          }
        }

        if (props.spacesRule === InputSpaceEnums.limitMaxOneSpace) {
          e.currentTarget.value = e.currentTarget.value
            .replace(/\s{2,}/g, " ")
            .trimStart();
        }

        if (props.spacesRule === InputSpaceEnums.noSpaces) {
          e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
        }

        if (props.limitComma) {
          const commaCount = (inputValue.match(/,/g) || []).length;
          if (commaCount > 1) {
            inputValue = inputValue.replace(/,/g, (_, idx) =>
              idx === inputValue.indexOf(",") ? "," : "",
            );
          }
          e.currentTarget.value = inputValue;
        }

        if (inputValue === "" && e.currentTarget.value.length > 0) {
          return;
        }

        if (props.onlyNumber) {
          const numericValue = e.currentTarget.value.replace(/[^0-9]/g, "");

          if (numericValue || numericValue === "") {
            field.onChange(
              e.currentTarget?.validity.valid
                ? numericValue
                : field.value?.trim(),
            );

            props.changeExtraFn &&
              props.changeExtraFn(
                e.currentTarget?.validity.valid
                  ? numericValue
                  : field.value?.trim(),
              );
          }
        } else if (props.onlyText) {
          const textValue = e.currentTarget.value.replace(
            /[0-9!@#$%^&*(),.?":{}|<>\-=/]+/g,
            "",
          );

          if (textValue || textValue === "") {
            field.onChange(
              e.currentTarget?.validity.valid ? textValue : field.value?.trim(),
            );
            props.changeExtraFn &&
              props.changeExtraFn(
                e.currentTarget?.validity.valid
                  ? textValue
                  : field.value?.trim(),
              );
          }
        } else if (props.regex) {
          const textValue = e.currentTarget.value.replace(
            props.regex,
            props.replacementString ?? "",
          );

          if (textValue || textValue === "") {
            field.onChange(
              e.currentTarget?.validity.valid ? textValue : field.value?.trim(),
            );
            props.changeExtraFn &&
              props.changeExtraFn(
                e.currentTarget?.validity.valid
                  ? textValue
                  : field.value?.trim(),
              );
          }
        } else if (props.trimValue) {
          field.onChange(e.currentTarget.value.trim());
          props.changeExtraFn &&
            props.changeExtraFn(e.currentTarget.value.trim());
        } else {
          field.onChange(e.currentTarget.value);
          props.changeExtraFn && props.changeExtraFn(e.currentTarget.value);
        }
        // If "noneZeroValue" is enabled and the input value equals zero:
        if (props.noneZeroValue && e.currentTarget.value.trim() === "0") {
          // Use "noneZeroSettableValue" if defined, otherwise fallback to the default value "1".
          const newValue = props.noneZeroSettableValue ?? "1";
          // Update the field's value to the new determined value.
          field.onChange(newValue);

          // If an additional function is provided, invoke it with the new value.
          props.changeExtraFn?.(newValue);
        }
      },
      [field, props],
    );

    const handleOnBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (props.blurExtraFn) {
          const value = props.blurExtraFn(e);
          if (value) {
            field.onChange(value);
            props.changeExtraFn?.(value);
          }
        }
      },
      [props, field],
    );

    return (
      <div
        className={clsx(styles["form-group"], {
          [props.className as string]: props.className,
        })}
      >
        <label htmlFor={props.name} className={styles["form-label"]}>
          {props.label}
          {props.required && "*"}
        </label>
        <div
          className={clsx(styles["input-container"], {
            [styles["disabled"]]: props?.disabled,
          })}
          {...props.containerAttrs}
        >
          <input
            id={props.name}
            aria-invalid={!!error}
            aria-describedby={showErrorLabel ? `${props.name}-error` : undefined}
            pattern={props.onlyNumber ? "[0-9]*" : undefined}
            type={inputType}
            disabled={props?.disabled || props?.onlyInputDisabled}
            readOnly={props?.readonly}
            {...field}
            ref={ref}
            onChange={handleChange}
            value={field.value || ""}
            maxLength={props.maxLength}
            minLength={props.minLength}
            className={clsx(props.inputClassName, styles["form-input"], {
              [styles["error-input"]]: error,
              [styles["success-input"]]: success,
              [styles["disabled-input"]]: props.disabled || props.readonly,
            })}
            name={props.name}
            alt=""
            placeholder={props.placeholder}
            onBlur={handleOnBlur}
            autoComplete={props.autoComplete}
          />
          <div className={styles["extra-info-container"]}>
            {props.passwordToggle && props.type === "password" && (
              <button
                type="button"
                tabIndex={-1}
                className={styles["password-toggle"]}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            )}
            {props.infoIcon && (
              <motion.div
                {...formAnimation}
                // className={styles["info-icon"]}
                transition={{
                  duration: 0.2,
                }}
              >
                {props.infoIcon}
              </motion.div>
            )}

            {error && (
              <motion.div
                {...formAnimation}
                className={clsx(
                  styles["extra-icon"],
                  props.errorIconExtraClassName,
                )}
                transition={{
                  duration: 0.2,
                }}
              >
                <ErrorIcon />
              </motion.div>
            )}
            {success && (
              <motion.div
                {...formAnimation}
                transition={{
                  duration: 0.2,
                }}
                className={clsx(
                  styles["extra-icon"],
                  props.checkIconExtraClassName,
                )}
              >
                <CheckIcon />
              </motion.div>
            )}
            {props.isEmail && props.isEmailVerified && (
              <EmailVerifiedIcon
                className={clsx(
                  props.emailVerifiedIconClassName,
                  styles["extra-icon"],
                )}
              />
            )}
          </div>
          {props.visibleLimit && props.maxLength && (
            <div className={clsx(props.charCountClassName)}>
              {(field.value && field.value?.length) || 0}/{props.maxLength}
            </div>
          )}
        </div>
        {/* Error message part */}
        <AnimatePresence>
          {showErrorLabel && error && error.message && (
              <ErrorLabel
                id={`${props.name}-error`}
                className={props.errorLabelClassName}
                message={error.message}
              />
            )}
        </AnimatePresence>
      </div>
    );
  },
);