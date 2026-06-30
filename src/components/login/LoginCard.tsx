"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "@/api/queries/useAuthQueries";
import { InputField } from "@/components/common/InputField";
import { addToastify } from "@/redux/slices/toastSlice";
import styles from "@/styles/components/login/LoginCard.module.scss";

export const LoginCard = () => {
  const t = useTranslations("layout.login");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useLoginMutation();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({ email, pwd });
      dispatch(
        addToastify({
          message: t("success"),
          type: "success",
          icon: "close",
          id: "login" + Date.now(),
        }),
      );
      router.push("/");
    } catch (err: any) {
      dispatch(
        addToastify({
          message:
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            t("error"),
          type: "error",
          icon: "close",
          id: "login" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.description}>{t("subtitle")}</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles["field-group"]}>
          <label htmlFor="email" className={styles.label}>
            {t("emailLabel")}
          </label>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            icon="mail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles["field-group"]}>
          <label htmlFor="password" className={styles.label}>
            {t("passwordLabel")}
          </label>
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon="lock"
            autoComplete="current-password"
            togglePassword
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submit} disabled={isPending}>
          <span>{isPending ? t("submitting") : t("submit")}</span>
          <span className={`material-symbols-outlined ${styles["submit-icon"]}`}>
            login
          </span>
        </button>
      </form>
    </div>
  );
};
