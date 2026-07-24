"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useBodyScrollLock } from "@/api/queries/useBodyScrollLock";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { stripLocale } from "@/utils/stripLocale";

import styles from "@/styles/Layout.module.scss";

const AUTH_ROUTES = ["/login", "/forgot-password"];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route));

  const [isOpen, setIsOpen] = useState(false);

  // Rota değişince drawer'ı kapat (menü linkleri next/link olduğu için
  // tıklamalarda otomatik tetiklenir — menü bileşenlerine dokunmaya gerek yok)
  useEffect(() => {
    setIsOpen(false);
  }, [rawPathname]);

  // Escape ile kapat
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Drawer açıkken arka planı kilitle (mobil)
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
      <div className={styles["content"]}>{children}</div>
    </>
  );
};
