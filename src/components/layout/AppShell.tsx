"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { stripLocale } from "@/utils/stripLocale";
import styles from "@/styles/Layout.module.scss";

const AUTH_ROUTES = ["/login", "/forgot-password"];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = stripLocale(usePathname());
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className={styles["content"]}>{children}</div>
    </>
  );
};
