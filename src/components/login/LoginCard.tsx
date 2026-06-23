"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "@/api/queries/useAuthQueries";
import { InputField } from "@/components/common/InputField";
import { addToastify } from "@/redux/slices/toastSlice";
import styles from "@/styles/components/login/LoginCard.module.scss";

export const LoginCard = () => {
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
          message: "Giriş başarılı",
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
            "Giriş başarısız",
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
        <h2 className={styles.title}>Güvenli Giriş</h2>
        <p className={styles.description}>
          Sisteme erişmek için kimlik bilgilerinizi giriniz.
        </p>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles["field-group"]}>
          <label htmlFor="email" className={styles.label}>
            E-posta
          </label>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="ornek@firma.com"
            icon="mail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles["field-group"]}>
          <label htmlFor="password" className={styles.label}>
            Şifre
          </label>
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon="lock"
            autoComplete="current-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <div className={styles["options-row"]}>
            <div className={styles.remember}>
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles["remember-label"]}>
                Beni Hatırla
              </label>
            </div>
            <Link href="/forgot-password" className={styles.forgot}>
              Şifremi Unuttum
            </Link>
          </div>
        </div>

        <button type="submit" className={styles.submit} disabled={isPending}>
          <span>{isPending ? "Giriş yapılıyor..." : "Giriş Yap"}</span>
          <span className={`material-symbols-outlined ${styles["submit-icon"]}`}>
            login
          </span>
        </button>
      </form>
    </div>
  );
};
