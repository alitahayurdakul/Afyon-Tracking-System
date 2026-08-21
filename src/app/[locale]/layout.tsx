import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Analytics } from "@vercel/analytics/next";

import { AppShell } from "@/components/layout/AppShell";

import { Providers } from "./providers";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

config.autoAddCss = false;

/**
 * Locale-aware metadata. A static object here served the same Turkish title to
 * /en, /de and /ru; this reads the same message catalogue the UI uses.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Required before getTranslations, otherwise next-intl treats the render as
  // dynamic and the whole route tree drops out of static generation.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "layout.meta" });

  return {
    title: { default: t("title"), template: `%s | ${t("title")}` },
    description: t("description"),
    // Internal, sign-in-only tool: keep it out of search indexes.
    robots: { index: false, follow: false },
  };
}

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as  "tr" | "en" | "de" | "ru")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
