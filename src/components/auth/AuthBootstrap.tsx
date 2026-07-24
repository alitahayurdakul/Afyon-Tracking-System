"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { refreshAccessToken } from "@/api/queries/useAuthQueries";
import { URL_PAGES } from "@/consts/url";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import {
  clearAuth,
  getAccessTokenInMemory,
  setAccessToken,
} from "@/redux/slices/authSlice";

import styles from "./Wrapper.module.scss";

const PUBLIC_PATHS = ["/login", "/forgot-password"];
// const HOME_PATH = "/";
const HOME_PATH = URL_PAGES.activeProcesses;

// The session is validated once per browser session via /refresh. Changing the
// language remounts this component (the `[locale]` segment changes), but we must
// not re-run the refresh + redirect — that would bounce a logged-in user back to
// /login. On those remounts we trust the in-memory access token instead.
let sessionChecked = false;

// Strip a leading locale segment (e.g. "/en/login" -> "/login") so public-path
// checks work regardless of the active language.
const stripLocale = (path: string): string => {
  const [, maybeLocale, ...rest] = path.split("/");
  if ((routing.locales as readonly string[]).includes(maybeLocale)) {
    return "/" + rest.join("/");
  }
  return path;
};

type Status = "loading" | "ready" | "redirecting";

export const Wrapper = () => {
  return (
    <div className={styles.overlay}>
      {<span className={styles.spinner} />}
    </div>
  );
};

export const AuthBootstrap = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.includes(stripLocale(pathname));
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Already validated this browser session (e.g. a remount triggered by a
      // language change): rely on the in-memory token, don't hit /refresh again.
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
  }, []);

  useEffect(() => {
    if (status === "redirecting") setStatus("ready");
  }, [pathname]);

  if (status !== "ready") return <Wrapper />;
  return <>{children}</>;
};
