"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { useBodyScrollLock } from "@/api/queries/useBodyScrollLock";
import {
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
} from "@/api/queries/useForgotPasswordQueries";
import { extractApiError } from "@/utils/extractApiError";
import {
  getResetCodeSecondsLeft,
  RESET_CODE_LENGTH,
  RESET_CODE_TTL_SECONDS,
} from "@/utils/forgotPasswordFlow";

import styles from "@/styles/components/forgot-password/VerifyCodeModal.module.scss";

interface IPropsTypes {
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

const formatDuration = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const VerifyCodeModal = ({
  email,
  onClose,
  onVerified,
}: IPropsTypes) => {
  const t = useTranslations("layout.forgotPassword.modal");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const isExpired = secondsLeft !== null && secondsLeft <= 0;

  const { mutateAsync: verifyCode, isPending: isSubmitting } =
    useVerifyResetCodeMutation();
  const { mutateAsync: resendCode, isPending: isResending } =
    useForgotPasswordMutation();

  useEffect(() => {
    inputRef.current?.focus();
    setSecondsLeft(getResetCodeSecondsLeft());
  }, []);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(getResetCodeSecondsLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // This component is only mounted while the dialog is open, so the lock is
  // held for its whole lifetime. It goes through the shared refcounted hook so
  // it cannot fight the other locks over document.body.
  useBodyScrollLock(true);

  const onSubmit = useCallback(async () => {
    if (isExpired || code.length !== RESET_CODE_LENGTH) return;

    setError("");
    try {
      await verifyCode({ email, code });
      onVerified();
    } catch (err) {
      setError(extractApiError(err, t("invalidCode")));
    }
  }, [code, email, isExpired, onVerified, verifyCode, t]);

  const onResend = useCallback(async () => {
    setError("");
    try {
      await resendCode({ email });
      setCode("");
      setSecondsLeft(getResetCodeSecondsLeft());
      inputRef.current?.focus();
    } catch (err) {
      setError(extractApiError(err, t("resendError")));
    }
  }, [email, resendCode, t]);

  return (
    <div
      className={styles["overlay"]}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-code-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles["modal"]}>
        <button
          type="button"
          className={styles["close"]}
          onClick={onClose}
          aria-label={t("close")}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className={styles["header"]}>
          <span className={`material-symbols-outlined ${styles["header-icon"]}`}>
            mark_email_read
          </span>
          <h2 id="verify-code-title" className={styles["title"]}>
            {t("title")}
          </h2>
          <p className={styles["description"]}>
            {t("description", { email, length: RESET_CODE_LENGTH })}
          </p>
        </div>

        <div
          className={`${styles["countdown"]} ${
            isExpired ? styles["countdown-expired"] : ""
          }`}
        >
          <span className="material-symbols-outlined">timer</span>
          <span>
            {isExpired
              ? t("expired")
              : t("remaining", {
                  time: formatDuration(secondsLeft ?? RESET_CODE_TTL_SECONDS),
                })}
          </span>
        </div>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={RESET_CODE_LENGTH}
          disabled={isExpired || isSubmitting}
          placeholder="______"
          className={styles["code-input"]}
          value={code}
          onChange={(e) => {
            setError("");
            setCode(e.target.value.replace(/\D/g, ""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />

        {error && <p className={styles["error"]}>{error}</p>}

        <button
          type="button"
          className={styles["submit"]}
          disabled={
            isExpired || isSubmitting || code.length !== RESET_CODE_LENGTH
          }
          onClick={onSubmit}
        >
          {isSubmitting ? t("verifying") : t("verify")}
        </button>

        <button
          type="button"
          className={styles["resend"]}
          disabled={!isExpired || isResending}
          onClick={onResend}
        >
          {isResending ? t("resending") : t("resend")}
        </button>
      </div>
    </div>
  );
};
