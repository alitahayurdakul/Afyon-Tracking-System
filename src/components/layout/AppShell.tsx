"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useBodyScrollLock } from "@/api/queries/useBodyScrollLock";
import { PermissionRouteGuard } from "@/components/common/PermissionRouteGuard";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { stripLocale } from "@/utils/stripLocale";

import styles from "@/styles/Layout.module.scss";

const AUTH_ROUTES = ["/login", "/forgot-password"];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route));

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [rawPathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useBodyScrollLock(isOpen);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <button
        type="button"
        className={styles["hamburger"]}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
      </button>

      {isOpen && (
        <div
          className={styles["overlay"]}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isOpen} />
      <div className={styles["content"]}>
        <PermissionRouteGuard>{children}</PermissionRouteGuard>
      </div>
    </>
  );
};
