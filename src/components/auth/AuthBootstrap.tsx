"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshAccessToken } from "@/api/queries/useAuthQueries";
import { isPublicPath, URL_PAGES } from "@/consts/url";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  clearAuth,
  getAccessTokenInMemory,
  setAccessToken,
} from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { stripLocale } from "@/utils/stripLocale";

import styles from "./Wrapper.module.scss";

const HOME_PATH = URL_PAGES.activeProcesses;

let sessionChecked = false;

type Status = "loading" | "ready" | "redirecting";

export const Wrapper = () => {
  return (
    <div className={styles.overlay}>{<span className={styles.spinner} />}</div>
  );
};

export const AuthBootstrap = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = isPublicPath(stripLocale(pathname));
  const [status, setStatus] = useState<Status>("loading");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (sessionChecked) {
        const token = getAccessTokenInMemory();
        if (token && isPublic) {
          setStatus("redirecting");
          router.replace(HOME_PATH);
          return;
        }
        if (!token && !isPublic) {
          setStatus("redirecting");
          router.replace("/login");
          return;
        }
        setStatus("ready");
        return;
      }

      const token = await refreshAccessToken();
      if (cancelled) return;
      sessionChecked = true;

      if (token) {
        dispatch(setAccessToken(token));
        if (isPublic) {
          setStatus("redirecting");
          router.replace(HOME_PATH);
          return;
        }
      } else {
        dispatch(clearAuth());
        if (!isPublic) {
          setStatus("redirecting");
          router.replace("/login");
          return;
        }
      }
      setStatus("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, isPublic]);

  const blocked = sessionChecked && !accessToken && !isPublic;

  if (status !== "ready" || blocked) return <Wrapper />;
  return <>{children}</>;
};
