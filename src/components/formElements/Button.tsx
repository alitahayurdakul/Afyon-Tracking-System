/* eslint-disable */
import clsx from "clsx";
import React, { forwardRef, MouseEventHandler, useEffect } from "react";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import styles from "@/styles/components/formElements/Button.module.scss";

import { Badge } from "./Badge";

export type TypeButtons =
  | "simple" // no hover effect
  | "primary"
  | "default"
  | "next"
  | "cancel"
  | "danger"
  | "success"
  | "blue-green"
  | "text";

type SizeElement = "small" | "medium" | "large";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "type"> {
  type?: TypeButtons;
  buttonType?: "button" | "submit" | "reset";
  clickFn?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | (() => void) | any;
  loading?: boolean;
  label?: string;
  className?: string;
  size?: SizeElement;
  iconLeft?: any;
  iconRight?: any;
  disabled?: boolean;
  style?: any;
  badge?: {
    className?: string;
    count?: string | number;
    loading?: boolean;
  };
}

export type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, React.PropsWithChildren<ButtonProps>>(
  function ButtonComp(
    {
      type = "default",
      buttonType = "button",
      disabled,
      clickFn,
      className,
      label,
      loading,
      size = "medium",
      iconLeft,
      iconRight,
      style,
      badge,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        {...rest}
        style={style || {}}
        disabled={disabled}
        onClick={clickFn ?? rest.onClick}
        className={clsx(
          styles["button"],
          styles[type],
          styles["btn-size-" + size],
          {
            [styles["no-label"]]: !label && !children,
            [className as string]: className,
          },
        )}
        type={buttonType}
      >
        {loading ? (
          <div className={styles["rotate"]}>
            <SpinnerIcon theme={type === "primary" ? "dark" : "light"} />
          </div>
        ) : (
          <>
            {iconLeft}
            {"string" === typeof label ? (
              <span>{label}</span>
            ) : (
              label || children
            )}
            {iconRight}
          </>
        )}

        {/* Badge */}
        {badge && (
          <Badge
            loading={badge?.loading}
            className={styles["badge"]}
            count={badge?.count ?? "-"}
          />
        )}
        {/* !Badge */}
      </button>
    );
  },
);
