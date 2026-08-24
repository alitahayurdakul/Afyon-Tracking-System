import type { Metadata } from "next";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Afyon İş Akışı Yönetim Sistemi",
  description: "Tren filosu bakım ve iş akışı takip sistemi.",
  robots: { index: false, follow: false },
};

/**
 * Pass-through. <html> and <body> are rendered by app/[locale]/layout.tsx,
 * where the locale is a route param and therefore known at build time — the
 * only way to get a correct lang attribute without making every page dynamic.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
