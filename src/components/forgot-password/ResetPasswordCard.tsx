"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { useResetPasswordMutation } from "@/api/queries/useForgotPasswordQueries";
import { URL_PAGES } from "@/consts/url";
import { Link, useRouter } from "@/i18n/routing";
import { addToastify } from "@/redux/slices/toastSlice";
import { extractApiError } from "@/utils/extractApiError";
import {
  clearResetFlow,
  getResetToken,
  isResetFlowVerified,
} from "@/utils/forgotPasswordFlow";

import styles from "@/styles/components/forgot-password/ResetPasswordCard.module.scss";

const MIN_PASSWORD_LENGTH = 6;

export const ResetPasswordCard = () => {
  const t = useTranslations("layout.forgotPassword.reset");
  const tCommon = useTranslations("layout.forgotPassword");
  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmation?: string;
  }>({});
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  const { mutateAsync: resetPassword, isPending: isSubmitting } =
    useResetPasswordMutation();

  useEffect(() => {
    const allowed = isResetFlowVerified();
    setIsAllowed(allowed);
    if (!allowed) {
      router.replace(URL_PAGES.forgotPassword);
    }
  }, [router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: { password?: string; confirmation?: string } = {};

    if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = t("passwordMin", { min: MIN_PASSWORD_LENGTH });
    }
    if (!confirmation) {
      nextErrors.confirmation = t("confirmationRequired");
    } else if (password !== confirmation) {
      nextErrors.confirmation = t("passwordsNotMatch");
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await resetPassword({
        resetToken: getResetToken(),
        newPassword: password,
      });
      clearResetFlow();
      dispatch(
        addToastify({
          message: t("success"),
          type: "success",
          icon: "close",
          id: "resetPassword" + Date.now(),
        }),
      );
      router.replace(URL_PAGES.login);
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("error")),
          type: "error",
          icon: "close",
          id: "resetPasswordError" + Date.now(),
        }),
      );
    }
  };

  if (isAllowed !== true) return null;

  const isMatching =
    password.length > 0 && confirmation.length > 0 && password === confirmation;

  return (
    <div className={styles.card}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>
          {t("description", { min: MIN_PASSWORD_LENGTH })}
        </p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles["field-group"]}>
          <label htmlFor="new-password" className={styles.label}>
            {t("passwordLabel")}
          </label>
          <div className={styles["input-wrapper"]}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              lock
            </span>
            <input
              id="new-password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className={styles.input}
              value={password}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, password: undefined }));
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              tabIndex={-1}
              className={styles.toggle}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {errors.password && (
            <span className={styles["field-error"]}>{errors.password}</span>
          )}
        </div>

        <div className={styles["field-group"]}>
          <label htmlFor="confirm-password" className={styles.label}>
            {t("confirmationLabel")}
          </label>
          <div className={styles["input-wrapper"]}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              lock_reset
            </span>
            <input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmation ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className={styles.input}
              value={confirmation}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, confirmation: undefined }));
                setConfirmation(e.target.value);
              }}
            />
            <button
              type="button"
              tabIndex={-1}
              className={styles.toggle}
              onClick={() => setShowConfirmation((prev) => !prev)}
              aria-label={
                showConfirmation ? t("hidePassword") : t("showPassword")
              }
            >
              <span className="material-symbols-outlined">
                {showConfirmation ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {errors.confirmation && (
            <span className={styles["field-error"]}>{errors.confirmation}</span>
          )}
          {!errors.confirmation && isMatching && (
            <span className={styles["field-success"]}>
              {t("passwordsMatch")}
            </span>
          )}
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          <span>{isSubmitting ? t("submitting") : t("submit")}</span>
          <span className={`material-symbols-outlined ${styles["submit-icon"]}`}>
            check
          </span>
        </button>
      </form>

      <div className={styles.footer}>
        <Link href={URL_PAGES.login} className={styles["back-link"]}>
          <span
            className={`material-symbols-outlined ${styles["back-link-icon"]}`}
          >
            arrow_back
          </span>
          <span className={styles["back-link-text"]}>
            {tCommon("backToLogin")}
          </span>
        </Link>
      </div>
    </div>
  );
};
