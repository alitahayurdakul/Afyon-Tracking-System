"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: replaces the root layout when it is the layout itself
 * that throws, so nothing above it (providers, i18n, stylesheets) is available.
 * Copy is therefore hardcoded in the default locale and the styles are inline —
 * everything this file needs must live in this file.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ui] root layout failed", error);
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: "#1a1c1e",
          background: "#fff",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Bir şeyler ters gitti
        </h1>
        <p style={{ maxWidth: "32rem", color: "#64748b", lineHeight: 1.6 }}>
          Beklenmeyen bir hata oluştu. Sayfayı yeniden deneyebilirsiniz.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "0.625rem 1.25rem",
            border: "1px solid #004286",
            borderRadius: "0.5rem",
            background: "#004286",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Tekrar dene
        </button>
        {error.digest && (
          <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
            #{error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
