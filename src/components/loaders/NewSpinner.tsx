import React from "react";
import clsx from "clsx";

import styles from "@/styles/components/baseElements/NewSpinner.module.scss";

interface NewSpinnerProps {
  spin?: boolean;
  className?: string;
  spinnerClassName?: string;
  maskClassName?: string;
}

export const NewSpinner = ({
  spin,
  className,
  children,
  spinnerClassName,
  maskClassName
}: React.PropsWithChildren<NewSpinnerProps>) => {
  return spin ? (
    <div className={clsx(styles["container"], className)}>
      <div className={clsx(styles["spinner"], spinnerClassName)} />
      <div className={clsx(styles["mask"], maskClassName)}>{children}</div>
    </div>
  ) : (
    children
  );
};
