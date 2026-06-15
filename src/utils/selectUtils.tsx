import clsx from "clsx";
import Image from "next/image";
import {
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  InputProps,
  OptionProps,
  StylesConfig,
} from "react-select";

import { CaretDownIcon, CaretUpIcon } from "@/components/icons/CaretIcons";
import styles from "@/styles/components/common/SelectBox.module.scss";
import { IOptionType } from "@/types/formTypes";

export const selectStyle:
  | StylesConfig<IOptionType, boolean, GroupBase<IOptionType>>
  | undefined = {
  menuPortal: (defaultStyles) => ({
    ...defaultStyles,
    paddingBottom: "10px",
    position: "absolute",
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    paddingBottom: 1,
    paddingTop: 0,
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "var(--base-grey-50, #939699)",
    fontSize: "14px",
    lineHeight: "20px",
    padding: "5px 10px 5px 7px",
  }),
  input: (
    base: CSSObjectWithLabel,
    props: InputProps<IOptionType, boolean, GroupBase<IOptionType>>,
  ) => ({
    ...base,
    margin: 0,
    padding: "5px 10px 5px 7px",
    color: "var(--base-grey-50, #939699)",
    fontSize: "14px",
    lineHeight: "20px",
  }),
  control: (base, state) => {
    const border = state.menuIsOpen
      ? "1px solid var(--bluegreen-100)"
      : "1px solid var(--input-border)";

    const borderBottom = state.menuIsOpen
      ? "1px solid transparent"
      : "1px solid var(--input-border)";

    const borderHover = "1px solid var(--bluegreen-100)";

    const borderBottomHover = state.menuIsOpen
      ? "1px solid transparent"
      : "1px solid var(--bluegreen-100)";

    return {
      ...base,
      color: "var(--base-grey-85, #4B5157)",
      borderRadius: "var(--form-border-radius)",
      // boxShadow: state.menuIsOpen ? "none" : base.boxShadow,
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
        borderBottom: borderBottomHover,
        cursor: "pointer",
      },
      borderBottom,
    };
  },
  container: (base: CSSObjectWithLabel) => ({
    ...base,
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: "5px 10px 5px 7px",
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    paddingLeft: 0,
  }),
  indicatorSeparator: (base: CSSObjectWithLabel) => ({
    ...base,
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    marginTop: 0,
    border: "1px solid var(--bluegreen-100)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: "1px solid transparent",
    boxShadow: "none",
    padding: 0,
  }),
  option: (base, state) => {
    return {
      ...base,
      color: "var(--base-grey-85, #4B5157)",
      fontSize: 14,
      backgroundColor:
        state.data === state.selectProps.value
          ? `var(--grey-15, #E2E8EB)`
          : state.isFocused
            ? `var(--grey-15, #e2e8eb)`
            : `var(--base-white, #FFF)`,
      border: `1px solid var(--bluegreen-25, #CBD5EE)`,
      "&:hover": {
        backgroundColor: "var(--bluegreen-25, #CBD5EE)",
        border: `1px solid var(--bluegreen-25, #CBD5EE)`,
        cursor: "pointer",
      },
    };
  },
};

export const SelectValueContainer = ({
  children,
  refSelect,
  ...props
}: any) => {
  const [values, input] = children as any;

  if (refSelect?.current && props.selectProps.menuIsOpen) {
    refSelect.current.focus();
  }

  if (Array.isArray(values)) {
    const count = values.length;
    return (
      <components.ValueContainer
        className={styles["value-container"]}
        {...props}
      >
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

// Not used. Please check.
export const SelectValueManufacturerContainer = ({
  children,
  refSelect,
  ...props
}: any) => {
  const [values, input] = children as any;

  if (refSelect?.current && props.selectProps.menuIsOpen) {
    refSelect.current.focus();
  }

  if (Array.isArray(values)) {
    const count = values.length;
    return (
      <components.ValueContainer
        // className={styles["value-container"]}
        {...props}
      >
        <label
          // stil class olarak yazılacak
          style={{
            color: "var(--Base-Grey-85, #4B5157)",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "19px",
          }}
        >
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

export const SingleValue = (props: any) => {
  return (
    <components.SingleValue className={styles["selected-option"]} {...props}>
      {props.data.image && (
        <Image
          src={props.data.image}
          alt={props.data.label}
          width={20}
          height={20}
        />
      )}
      <label>{props.data.label}</label>
    </components.SingleValue>
  );
};

export const SelectInput = (props: any) => {
  return (
    <components.Input {...props} autoComplete="new-password"></components.Input>
  );
};

export const SingleOption = (props: OptionProps<IOptionType>) => {
  return (
    <components.Option className={styles["option-container"]} {...props}>
      {props.data ? (
        <div tabIndex={-1} className={styles["option"]}>
          {props.data.image && (
            <Image
              src={props.data.image}
              alt={props.data.label}
              width={20}
              height={20}
            />
          )}
          <label tabIndex={-1}>{props.data.label}</label>
        </div>
      ) : null}
    </components.Option>
  );
};

export const SingleMultiOption = (props: OptionProps<IOptionType>) => {
  return (
    <components.Option className={styles["option-container"]} {...props}>
      {props.data ? (
        <div className={clsx(styles["option"], styles["multi-option"])}>
          <input checked={props.isSelected} type="checkbox" readOnly />
          {props.data.image && (
            <Image
              src={props.data.image}
              alt={props.data.label}
              width={20}
              height={20}
            />
          )}
          <label>{props.data.label}</label>
          {props.data.count !== 0 && (
            <label className={styles["label-right"]}>{props.data.count}</label>
          )}
        </div>
      ) : null}
    </components.Option>
  );
};
/**
 * when the modal menu is closed
 * @param props
 * @returns
 * BERK
 */
export const DropdownIndicator = (
  props: DropdownIndicatorProps<IOptionType, boolean, GroupBase<IOptionType>>,
) => {
  const {
    selectProps: { menuIsOpen },
  } = props;
  return (
    <components.DropdownIndicator
      className={styles["form-select-caret"]}
      {...props}
    >
      {menuIsOpen ? <CaretUpIcon /> : <CaretDownIcon />}
    </components.DropdownIndicator>
  );
};

export const CustomMenuList = ({ selectProps, ...props }: any) => {
  return <components.MenuList {...props} selectProps={selectProps} />;
};
