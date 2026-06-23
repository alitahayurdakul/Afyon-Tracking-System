import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IPropsTypes {
  isLoading?: boolean;
  icon?: any;
  iconWidth?: number;
  colorFilter?: string;
  isHideIcon?: boolean;
  height?: number
}

export const LoadingChecker = ({
  children,
  isLoading,
  colorFilter,
  iconWidth,
  icon,
  isHideIcon,
  height
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
            <FontAwesomeIcon icon={faSpinner} size="3x" spin style={{ animationDuration: '2s', color: "var(--slate-90)"}}  />
          )
          }
        </div>
      )}
    </>
  );
};
