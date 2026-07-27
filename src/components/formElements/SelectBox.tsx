import {
  forwardRef,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useController, UseControllerProps } from "react-hook-form";
import Select, {
  components,
  MultiValue as MultiValueType,
  SingleValue as SingleValueType,
} from "react-select";

import { IOptionType } from "@/types/formTypes";
import {
  CustomMenuList,
  DropdownIndicator,
  SelectValueContainer,
  SingleMultiOption,
  SingleOption,
} from "@/utils/selectUtils";

import { ErrorLabel } from "./ErrorLabel";

import styles from "@/styles/components/common/SelectBox.module.scss";

export interface SelectBoxProps extends UseControllerProps {
  name: string;
  label?: string | false | null | ReactElement; 
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
  placeholderStyles?: any;
  isPortal?: boolean;
  changeExtraFn?: (id?: any) => void;
  hideIndicator?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
  controlStyles?: any;
  menuStyles?: any;
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

      placeholderStyles,
      hideIndicator,
      changeExtraFn,
      isSearchable = false,
      hideSelectedOptions = false,
      controlStyles,
      menuStyles
    } = props;
    const selectRef = useRef<any>(null);
    const [, setTrigger] = useState<number>(0);

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

    const getOptions = useCallback(
      () => {
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
      () => {
        if (multiselect) {
          return field.value;
        }

        return (
          (options &&
            Array.isArray(getOptions()) &&
            getOptions().find((option) => {
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
            value={value()}
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
              menuList: (base: any, state: any) => {
                const totalOptions = state.selectProps?.options?.length ?? 0;
                const selectedCount = Array.isArray(state.selectProps?.value)
                  ? state.selectProps.value.length
                  : state.selectProps?.value
                    ? 1
                    : 0;
                const allSelected = selectedCount >= totalOptions;
                return {
                  ...base,
                  maxHeight: "200px",
                  paddingBottom: 1,
                  paddingTop: 0,
                  marginTop: 0,
                  width: "100%",
                  padding: allSelected && hideSelectedOptions && "0!important",
                  height: allSelected && hideSelectedOptions && "0!important",
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
                };
              },
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
                const isActive = state.menuIsOpen || state.isFocused;
                const activeColor = fieldState.error
                  ? "var(--red-100)"
                  : "var(--border-blue-70)";
                const borderColor = fieldState.error
                  ? "var(--red-100)"
                  : isActive
                    ? "var(--border-blue-70)"
                    : "var(--border)";

                return {
                  ...base,
                  color: "var(--text-primary)",
                  borderRadius: "var(--form-border-radius)",
                  border: `1px solid ${borderColor}`,
                  boxShadow: isActive ? `0 0 0 1px ${activeColor}` : "none",
                  backgroundColor: "var(--white)",
                  "&:hover": {
                    borderColor: fieldState.error
                      ? "var(--red-100)"
                      : "var(--border-blue-70)",
                    cursor: "pointer",
                  },
                  ...controlStyles,
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
              menu: (base: any, state: any) => {
                const totalOptions = state.selectProps?.options?.length ?? 0;
                const selectedCount = Array.isArray(state.selectProps?.value)
                  ? state.selectProps.value.length
                  : state.selectProps?.value
                    ? 1
                    : 0;
                const allSelected = selectedCount >= totalOptions;
                return{
                ...base,
                marginTop: "4px",
                position: "static",
                border: allSelected ? "none" : "1px solid var(--border)",
                borderRadius: "var(--form-border-radius)",
                boxShadow: "var(--shadow-card)",
                padding: 0,
                backgroundColor: "var(--white)",
                overflow: "hidden",
                ...menuStyles
              }},
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
            options={getOptions()}
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
