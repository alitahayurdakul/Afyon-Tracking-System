# Styling & i18n

## Styling architecture

SCSS only — **no Tailwind, no CSS-in-JS, no Stylelint**.

### Organization

Styles live under `src/styles/` and **mirror the component tree instead of being co-located** (✔ owner decision: keep this — never co-locate styles):

```
src/styles/
├── globals.scss              # global styles + design tokens (imported in src/app/layout.tsx)
├── mixin.scss                # $breakpoints-up / $breakpoints-down maps + responsive mixins
├── Layout.module.scss        # AppShell
├── components/<area>/<Component>.module.scss
└── pages/                    # page-level containers (e.g. PageCommonContainer.module.scss)
```

Components import their module with the `@/` alias:

```tsx
import styles from "@/styles/components/trains/TrainForm.module.scss";
// class names are kebab-case → bracket access:
<div className={styles["page-container"]}>
```

### Tokens & responsive

- **Color tokens are CSS custom properties** defined in `globals.scss` `:root` — `--slate-*`, `--blue-*`, `--base-grey-*`, etc. Use `var(--token)`, don't hardcode hex values.
- **Breakpoints** are SCSS maps in `mixin.scss` (`$breakpoints-up` / `$breakpoints-down` with named sizes xsmall…xlarge in `em`), consumed via `@use "@/styles/mixin.scss"` (or relative `@use`) and its mixins in module files.
- Font: Inter, loaded via `@import url(googleapis)` at the top of `globals.scss`.
- Note: `src/app/globals.css` (create-next-app leftover) is *also* imported by the `[locale]` layout — it defines `--background`/`--foreground` and a dark-mode media query. It overlaps with `globals.scss`; prefer the tokens in `globals.scss` (known cleanup candidate, see [conventions.md](conventions.md)).

## i18n (next-intl)

### Routing

- Locales: `tr` (default), `en`, `de`, `ru` — `src/i18n/routing.ts`, `localePrefix: "as-needed"` (Turkish URLs have **no** locale prefix; other locales are prefixed).
- Navigation helpers (`Link`, `redirect`, `usePathname`, `useRouter`) are exported from `src/i18n/routing.ts` — use these, not the `next/navigation` equivalents, when locale awareness matters.
- Middleware is `src/proxy.ts` (Next 16 proxy convention): redirects `/` (and `/<locale>`) to the active-processes page, then delegates to next-intl's middleware. Matcher excludes `api`, `_next`, `_vercel`, and files with extensions.
- **Page slugs are Turkish** (`tren-yonetimi`, `asama-yonetimi`, `gecikme-nedenleri`, ...). The canonical map is `URL_PAGES` in `src/consts/url.ts` — always reference routes through it.

### Messages

- One JSON per domain per locale: `src/locales/<lang>/<domain>.json` (e.g. `trains.json`, `layout.json`).
- `src/i18n/request.ts` loads messages from a **hardcoded `files` array**. ⚠️ **When you add a new `<domain>.json`, you must also add its name to that array** — otherwise the namespace silently won't load (missing files only `console.warn`).
- Usage: `useTranslations("<domain>")` namespaced per domain; nested keys like `t("form.notifications.createSuccess")`. Validation error messages live in `layout.json` under `validation-errors` (`useTranslations("layout.validation-errors")`).
- ✔ **Owner decision: every new key must be added to all four locales** (`tr`, `en`, `de`, `ru`). Provide best-effort machine translations for `de`/`ru` and flag them for review in the task summary — never leave keys missing.
