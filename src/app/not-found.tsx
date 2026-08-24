import { routing } from "@/i18n/routing";

/**
 * Root 404, rendered for any URL that matches no route. Such a URL never enters
 * the [locale] segment, so this file sits outside it — and since <html>/<body>
 * live in app/[locale]/layout.tsx, this page has to supply its own document.
 * Styles are inline for the same reason.
 *
 * The copy is default-locale only, deliberately. Resolving the locale here
 * would need a dynamic API (cookies/headers), and a dynamic API in the global
 * not-found opts the ENTIRE app out of static generation — that cost is not
 * worth a translated 404. A [locale]/[...rest] catch-all was also tried: the
 * route then matches, so Next commits a 200 before notFound() runs and every
 * 404 becomes a soft 404. In-segment notFound() calls still render the
 * translated app/[locale]/not-found.tsx.
 */
export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: "#1a1c1e",
          background: "#fff",
        }}
      >
        <p style={{ fontSize: "4rem", fontWeight: 800, margin: 0, color: "#eaedf2" }}>
          404
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Sayfa bulunamadı
        </h1>
        <p style={{ maxWidth: "32rem", color: "#64748b", lineHeight: 1.6 }}>
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
        </p>
        <a
          href="/aktif-surecler"
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            border: "1px solid #004286",
            borderRadius: "0.5rem",
            background: "#004286",
            color: "#fff",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Ana sayfaya dön
        </a>
      </body>
    </html>
  );
}
