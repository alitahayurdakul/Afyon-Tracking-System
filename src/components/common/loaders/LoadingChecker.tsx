import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IPropsTypes {
  isLoading?: boolean;
  icon?: any;
  color?: string;
  isHideIcon?: boolean;
  height?: number
}

export const LoadingChecker = ({
  children,
  isLoading,
  color,
  icon,
  isHideIcon,
}: React.PropsWithChildren<IPropsTypes>) => {
  return (
    <>
      {!isLoading ? (
        children
      ) : icon ? (
        icon
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          {!isHideIcon && (
            <FontAwesomeIcon icon={faSpinner} size="3x" spin style={{ animationDuration: '2s', color: color ?? "var(--slate-90)"}}  />
          )
          }
        </div>
      )}
    </>
  );
};
