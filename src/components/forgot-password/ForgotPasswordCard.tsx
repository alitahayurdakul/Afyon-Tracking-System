"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { useForgotPasswordMutation } from "@/api/queries/useForgotPasswordQueries";
import { Captcha } from "@/components/common/Captcha";
import { InputField } from "@/components/common/InputField";
import { VERIFY_RESET_CODE_MODAL } from "@/consts/modals";
import { URL_PAGES } from "@/consts/url";
import { Link, useRouter } from "@/i18n/routing";
import { addToastify } from "@/redux/slices/toastSlice";
import { extractApiError } from "@/utils/extractApiError";
import { getResetFlowEmail } from "@/utils/forgotPasswordFlow";
import {
  useAddQueryParam,
  useRemoveQueryParamModal,
} from "@/utils/searchParams";

import { VerifyCodeModal } from "./VerifyCodeModal";

import styles from "@/styles/components/forgot-password/ForgotPasswordCard.module.scss";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPasswordCard = () => {
  const t = useTranslations("layout.forgotPassword");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const addQueryParam = useAddQueryParam();
  const removeModal = useRemoveQueryParamModal();

  const [email, setEmail] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [triggeredCaptcha, setTriggeredCaptcha] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [flowEmail, setFlowEmail] = useState("");

  const resetCaptcha = () => {
    setIsCaptchaVerified(false);
    setTriggeredCaptcha((prev) => prev + 1);
  };

  const { mutateAsync: forgotPassword, isPending: isSending } =
    useForgotPasswordMutation();

  const isModalRequested =
    searchParams.get("modal") === VERIFY_RESET_CODE_MODAL;

  useEffect(() => {
    if (!isModalRequested) {
      setFlowEmail("");
      return;
    }
    const storedEmail = getResetFlowEmail();
    if (!storedEmail) {
      removeModal();
      return;
    }
    setFlowEmail(storedEmail);
  }, [isModalRequested, removeModal]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setCaptchaError("");

    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setEmailError(t("invalidEmail"));
      return;
    }

    if (!isCaptchaVerified) {
      setCaptchaError(t("captchaRequired"));
      dispatch(
        addToastify({
          message: t("captchaToast"),
          type: "error",
          icon: "close",
          id: "captchaError" + Date.now(),
        }),
      );
      return;
    }

    try {
      await forgotPassword({ email: trimmedEmail });
      addQueryParam("modal", VERIFY_RESET_CODE_MODAL);
    } catch (err) {
      setEmailError(extractApiError(err, t("sendError")));
      resetCaptcha();
    }
  };

  const onVerified = () => {
    dispatch(
      addToastify({
        message: t("verifiedToast"),
        type: "success",
        icon: "close",
        id: "verifyResetCode" + Date.now(),
      }),
    );
    router.replace(URL_PAGES.resetPassword);
  };

  return (
    <div className={styles.card}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>{t("description")}</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles["field-group"]}>
          <label htmlFor="identifier" className={styles.label}>
            {t("emailLabel")}
          </label>
          <InputField
            id="identifier"
            name="identifier"
            type="email"
            placeholder={t("emailPlaceholder")}
            icon="mail"
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmailError("");
              setEmail(e.target.value);
            }}
          />
          {emailError && (
            <span className={styles["field-error"]}>{emailError}</span>
          )}
        </div>

        <Captcha
          isVerified={isCaptchaVerified}
          onVerifiedChange={(verified) => {
            setCaptchaError("");
            setIsCaptchaVerified(verified);
          }}
          triggeredCaptcha={triggeredCaptcha}
          error={captchaError}
          disabled={isSending}
        />

        <button type="submit" className={styles.submit} disabled={isSending}>
          <span>{isSending ? t("submitting") : t("submit")}</span>
          <span className={`material-symbols-outlined ${styles["submit-icon"]}`}>
            arrow_forward
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
          <span className={styles["back-link-text"]}>{t("backToLogin")}</span>
        </Link>
      </div>

      {isModalRequested && flowEmail && (
        <VerifyCodeModal
          email={flowEmail}
          onClose={() => {
            removeModal();
            setCaptchaError("");
            resetCaptcha();
          }}
          onVerified={onVerified}
        />
      )}
    </div>
  );
};
