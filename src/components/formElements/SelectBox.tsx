import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController, UseControllerProps } from "react-hook-form";
import Select, {
  components,
  MultiValue as MultiValueType,
  SingleValue as SingleValueType,
} from "react-select";

import styles from "@/styles/components/common/SelectBox.module.scss";
import { IOptionType } from "@/types/formTypes";
import {
  CustomMenuList,
  DropdownIndicator,
  SelectValueContainer,
  SingleMultiOption,
  SingleOption,
} from "@/utils/selectUtils";

import { ErrorLabel } from "./ErrorLabel";

export interface SelectBoxProps extends UseControllerProps {
  name: string;
  label?: string | false | null;
  loading?: boolean;
  errorQuery?: boolean;
  className?: string;
  selectClassName?: string;
  formLabelClassName?: string;
  required?: boolean;
  placeholder?: string;
  options: IOptionType[];
  defaultValue?: string | boolean | number | any;
  shouldUnregister?: boolean;
  isClearable?: boolean;
  errorOptionQueryText?: string;
  noOptionQueryText?: string;
  noSearchOptionQueryText?: string;
  menuIsOpen?: boolean;
  multiselect?: boolean;
  multiLabel?: string;
  disabled?: boolean;
  valueContainerStyles?: any;
  multipleValueContainerStyles?: any;
  placeholderStyles?: any;
  isPortal?: boolean;
  changeExtraFn?: (id?: any) => void;
  hideIndicator?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
}

export type Ref = HTMLInputElement;

export const SelectBox = forwardRef<Ref, SelectBoxProps>(
  function SelectBoxComponent(props, ref) {
    const {
      name,
      label,
      loading,
      errorQuery,
      className,
      selectClassName,
      formLabelClassName,
      required,
      placeholder,
      options,
      defaultValue,
      control,
      shouldUnregister,
      rules,
      isClearable,
      errorOptionQueryText,
      noOptionQueryText,
      noSearchOptionQueryText,
      menuIsOpen,
      multiselect,
      multiLabel,
      disabled,
      valueContainerStyles,
      multipleValueContainerStyles,
      placeholderStyles,
      hideIndicator,
      changeExtraFn,
      isSearchable = false,
      hideSelectedOptions = false,
    } = props;
    const selectRef = useRef<any>(null);
    const [trigger, setTrigger] = useState<number>(0);

    const { field, fieldState } = useController({
      name,
      control,
      defaultValue,
      shouldUnregister,
      rules,
    });

    const { error } = fieldState;

    const handleChange = useCallback(
      (
        newValue: SingleValueType<IOptionType> | MultiValueType<IOptionType>,
      ) => {
        if (!newValue) {
          // try to use setValue(name,newValue);
          field.onChange(newValue);
          setTrigger((c) => c + 1);
          changeExtraFn && changeExtraFn(newValue);
          return newValue;
        }

        if (Array.isArray(newValue)) {
          field.onChange(newValue);
          setTrigger((c) => c + 1);

          changeExtraFn && changeExtraFn(newValue);

          return newValue;
        } else {
          field.onChange((newValue as any)?.value);
          setTrigger((c) => c + 1);

          changeExtraFn && changeExtraFn((newValue as any)?.value);
          return newValue;
        }
      },
      [changeExtraFn, field, setTrigger],
    );

    useEffect(() => {
      if (trigger !== 0) {
        selectRef.current.focus();
      }
    }, [trigger]);

    const getOptions = useCallback(
      (name: string) => {
        // if (tParent) {
        //   const newOptions = options?.map((option: any) => {
        //     return {
        //       ...option,
        //       // label: tParent(`options.${name}.${option.label}`),
        //     };
        //   });
        //   return newOptions || undefined;
        // }
        return options || undefined;
      },
      [options],
    );

    const value = useCallback(
      (name: string) => {
        if (multiselect) {
          return field.value;
        }

        return (
          (options &&
            Array.isArray(getOptions(name)) &&
            getOptions(name).find((option) => {
              return (
                option.value === field.value || option.value === +field.value
              );
            })) ||
          []
        );
      },
      [multiselect, options, field],
    );

    return (
      <>
        <div className={clsx(styles["form-select-container"], className)}>
          {label && (
            <label className={clsx(formLabelClassName, styles["form-label"])}>
              {label}
              {required && "*"}
            </label>
          )}

          <Select
            {...field}
            ref={(element) => {
              selectRef.current = element;
              if (ref) {
                if (typeof ref === "function") {
                  ref(element as any);
                } else {
                  (ref.current as any) = element;
                }
              }
            }}
            isDisabled={disabled}
            id={name}
            menuShouldScrollIntoView={false}
            hideSelectedOptions={hideSelectedOptions}
            closeMenuOnSelect={multiselect ? false : true}
            isMulti={multiselect}
            menuIsOpen={menuIsOpen}
            instanceId={name}
            inputId={name}
            className={clsx(styles["form-select"], selectClassName)}
            isLoading={loading}
            noOptionsMessage={({ inputValue }) => {
              if (errorQuery) {
                return (
                  <>
                    {
                      errorOptionQueryText
                      // ||  t("form.selectError")
                    }
                  </>
                );
              }
              if (!inputValue) {
                return (
                  <>
                    {
                      noOptionQueryText
                      // ||  t("form.selectNoData")
                    }
                  </>
                );
              }
              return (
                <>
                  {
                    noSearchOptionQueryText
                    // ||  t("form.selectNoSearchData")
                  }
                </>
              );
            }}
            isClearable={isClearable}
            value={value(name)}
            onChange={handleChange}
            placeholder={
              placeholder === "none" ? "" : placeholder
              // || t("form.select")
            }
            components={{
              Option: multiselect ? SingleMultiOption : SingleOption,
              // SingleValue: SingleValue,
              ValueContainer: (props) =>
                multiselect ? (
                  <SelectMultiValueContainer
                    {...props}
                    refSelect={selectRef}
                    labelValue={
                      multiLabel === "none" ? "" : multiLabel
                      // || t("form.select")
                    }
                  />
                ) : (
                  <SelectValueContainer
                    {...props}
                    refSelect={selectRef}
                    labelValue={multiLabel}
                  />
                ),
              IndicatorSeparator: null,
              DropdownIndicator: !hideIndicator ? DropdownIndicator : null,
              MenuList: (props) => (
                <>
                  <CustomMenuList {...props} />
                </>
              ),
            }}
            isSearchable={isSearchable}
            styles={{
              menuPortal: (defaultStyles: any) => ({
                ...defaultStyles,
                paddingBottom: "10px",
                position: "absolute",
              }),
              menuList: (base: any) => ({
                ...base,
                maxHeight: "200px",
                paddingBottom: 1,
                paddingTop: 0,
                marginTop: 0,
                width: "100%",
                "::-webkit-scrollbar": {
                  width: "5px",
                  height: "60px",
                },
                "::-webkit-scrollbar *": {
                  background: "transparent",
                },
                "::-webkit-scrollbar-track": {
                  // background: "#f1f1f1"
                },
                "::-webkit-scrollbar-thumb": {
                  borderRadius: "8px",
                  background: "var(--base-grey-85, #4B5157)",
                },
                "::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }),
              placeholder: (base: any) => ({
                ...base,
                color: "var(--text-muted)",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                padding: "0 0 0 0",
                margin: 0,
                ...placeholderStyles,
              }),
              input: (base: any) => ({
                ...base,
                color: "var(--text-primary)",
                fontSize: "14px",
                lineHeight: "20px",
                margin: 0,
              }),
              control: (base: any, state: any) => {
                const border = state.menuIsOpen
                  ? "1px solid var(--border-blue-70)"
                  : fieldState.error
                    ? "1px solid var(--red-100)"
                    : "1px solid var(--border)";

                const borderBottom = state.menuIsOpen
                  ? "1px solid transparent"
                  : fieldState.error
                    ? "1px solid var(--red-100)"
                    : "1px solid var(--border)";

                // const borderHover = fieldState.error
                //   ? "1px solid var(--red-100)"
                //   : "1px solid var(--primary-purple)";

                const borderHover = state.menuIsOpen
                  ? "1px solid var(--border-blue-70)"
                  : fieldState.error
                    ? "1px solid var(--red-100)"
                    : "1px solid var(--primary-blue)";

                return {
                  ...base,
                  color: "var(--slate-90)",
                  borderRadius: "var(--form-border-radius)",
                  boxShadow: "none",
                  border,
                  borderBottomLeftRadius: state.menuIsOpen
                    ? "0"
                    : "var(--form-border-radius)",
                  borderBottomRightRadius: state.menuIsOpen
                    ? "0"
                    : "var(--form-border-radius)",
                  "&:hover": {
                    border: borderHover,
                    cursor: "pointer",
                  },
                  borderBottom,
                  backgroundColor: "var(--white)",
                };
              },
              container: (base: any) => ({
                ...base,
              }),
              valueContainer: (base: any) => ({
                ...base,
                padding: "7.84px 16px",
                ...valueContainerStyles,
              }),
              indicatorsContainer: (provided: any) => ({
                ...provided,
                paddingLeft: 0,
              }),
              indicatorSeparator: (base: any) => ({
                ...base,
              }),
              menu: (base: any) => ({
                ...base,
                marginTop: 0,
                border: "1px solid var(--border-blue-70)",
                borderRadius: "var(--form-border-radius)",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: "none",
                boxShadow: "var(--shadow-card)",
                padding: 0,
                backgroundColor: "var(--white)",
                overflow: "hidden",
              }),
              option: (base: any, state: any) => {
                return {
                  ...base,
                  color: "var(--text-primary)",
                  fontSize: 14,
                  backgroundColor: state.isSelected
                    ? `var(--slate-100)`
                    : `var(--white)`,
                  // state.data === state.selectProps.value
                  //   ? `var(--grey-15, #E2E8EB)`
                  //   : state.isFocused
                  //     ? `var(--grey-15, #e2e8eb)`
                  //     : `var(--white)`,
                  // border: `1px solid var(--bluegreen-25)`,
                  borderRight: "none!important",
                  borderLeft: "none!imporatant",
                  paddingLeft: "14px",
                  "&:hover": {
                    backgroundColor: "var(--slate-100)",
                    // border: `1px solid var(--bluegreen-25)`,
                    cursor: "pointer",
                  },
                  overflowX: "hidden",
                  width: "100%",
                  p: {
                    cursor: "pointer",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  },
                };
              },
            }}
            options={getOptions(name)}
            defaultValue={
              (options &&
                Array.isArray(options) &&
                options.filter((option) => option.value === defaultValue)) ||
              undefined
            }
          />
          <AnimatePresence>
            {error?.message && <ErrorLabel message={error.message} />}
          </AnimatePresence>
        </div>
      </>
    );
  },
);

export const SelectMultiValueContainer = ({
  children,
  refSelect,
  ...props
}: any) => {
  const [values] = children as any;

  if (refSelect?.current && props.selectProps.menuIsOpen) {
    refSelect.current.focus();
  }

  if (Array.isArray(values)) {
    const count = values.length;
    return (
      <components.ValueContainer {...props}>
        <label>
          {props?.labelValue} <span className={styles["circle"]}>{count}</span>
        </label>
        {children}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
};
