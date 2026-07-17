import clsx from "clsx";

import styles from "@/styles/components/common/ErrorChecker.module.scss";

import { Button } from "../../formElements/Button";

interface IPropsTypes {
  isButton?: boolean;
  isContent?: boolean;
  errorLabel?: string;
  errorClassName?: string;
}

export const ErrorComponent = ({
  isButton,
  isContent,
  errorLabel = "Bir şeyler ters gitti!",
  errorClassName,
}: IPropsTypes) => {
  return (
    <div className={styles["error-container"]}>
      <p
        className={clsx(styles["title"], {
          [errorClassName as string]: errorClassName,
        })}
      >
        {errorLabel}
      </p>

      {isContent && (
        <div className={styles["content"]}>İçerik yüklenemedi.</div>
      )}
      {isButton && (
        <Button
          type="primary"
          // label={t("errorPage.button") || ""}
          // clickFn={() => push("/")}
        />
      )}
    </div>
  );
};
