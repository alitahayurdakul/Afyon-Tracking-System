import React from "react";

import { ErrorComponent } from "./ErrorComponent";
import { NoDataComponent } from "./NoDataComponent";

interface IPropsTypes {
  isError?: boolean;
  errorLabel?: string;
  errorComponent?: any;
  noData?: boolean;
  noDataLabel?: string;
  errorClassName?: string;
}

export const ErrorChecker = ({
  isError,
  errorComponent,
  children,
  errorLabel,
  noData,
  noDataLabel,
  errorClassName
}: React.PropsWithChildren<IPropsTypes>) => {
  if (isError) {
    return errorComponent ? errorComponent : <ErrorComponent errorLabel={errorLabel} errorClassName={errorClassName} />;
  }
  else if(noData){
    return <NoDataComponent noDataLabel={noDataLabel} />
  }
  return children;
};
