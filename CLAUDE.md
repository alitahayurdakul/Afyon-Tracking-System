# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Train fleet / job-tracking frontend (Next.js 16 App Router, React 19, TS strict). Frontend-only repo: all data comes from an external backend (`API_URL` in `.env`) proxied through Next.js Route Handlers. No tests exist.

**Standing instruction from the project owner: never modify production code (anything outside `CLAUDE.md` and `docs/`) unless explicitly requested.** Documentation updates are always allowed; code changes require an explicit ask. The documents in `docs/` are the project's binding development and architecture rules.

**Detailed documentation lives in `docs/` — consult the relevant file before working in that area:**

| Doc | Covers |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Stack, folder structure, request flow, environment |
| [docs/api-layer.md](docs/api-layer.md) | The 4-layer API chain, endpoints, auth/token lifecycle, permissions, **checklist for adding an endpoint** |
| [docs/frontend-patterns.md](docs/frontend-patterns.md) | Page anatomy, URL-driven modals, config-driven forms, tables/pagination, Redux + React Query, toasts |
| [docs/shared-components.md](docs/shared-components.md) | Prop contracts of the shared `common/` + `formElements/` components (Modal, Table, inputs...) |
| [docs/styling-and-i18n.md](docs/styling-and-i18n.md) | SCSS organization, tokens/breakpoints, locales, message loading |
| [docs/conventions.md](docs/conventions.md) | Naming, lint/import-sort, hooks, known configuration debt |

## Commands

```bash
npm run dev        # dev server (http://localhost:3000)
npm run build      # production build (also run by the husky pre-commit hook — commits fail if build fails)
npm run lint       # eslint
# npm run lint-fix is BROKEN (uses `next lint`, removed in Next 16) — use `npx eslint . --fix`
```

`.env` must define `API_URL` (external backend base URL).

## Critical rules (violating these breaks existing behavior)

- **Every domain follows the same 4-layer chain**: query hook (`src/api/queries`) → Route Handler with `type`-enum dispatch (`src/app/api/<domain>/route.ts`, enum defined *in the route file*) → handler (`src/api/handlers`) → external backend via `END_POINTS`. All operations, including reads, are `POST`s. Extend all layers plus `END_POINTS`/`CLIENT_END_POINTS` in `src/consts/endpoints.ts` when adding endpoints.
- **Table refetch is done by bumping the counter in `triggerTableSlices`** (dispatched `addTriggerTable()` is part of every mutation's success path), NOT by `queryClient.invalidateQueries`.
- **Modals are URL-driven** (`?modal=<NAME>`, names in `src/consts/modals.ts`) and `src/utils/searchParams.ts` deliberately uses `window.history.replaceState` instead of `router.replace` (App Router cache bug — rationale commented in the file). Do not refactor that.
- **Auth**: access token in memory only (`authSlice`), refresh token httpOnly cookie; `axiosInstance` refresh-retries on 401 **and 403** (backend returns 403 for expired tokens). Don't persist tokens to storage.
- **Routes**: Turkish slugs under `src/app/[locale]/`; always use `URL_PAGES` (`src/consts/url.ts`) and the navigation helpers from `src/i18n/routing.ts`, never hardcoded paths.
- **i18n**: new `src/locales/<lang>/<domain>.json` files must be registered in the hardcoded `files` array in `src/i18n/request.ts`, and keys added to all four locales (`tr`, `en`, `de`, `ru`).
- **Pagination is 1-indexed everywhere** — no ±1 conversions (`usePaginationParams`).
- Styles are SCSS modules under `src/styles/` mirroring the component tree (not co-located); color tokens are CSS custom properties in `globals.scss`. No Tailwind.
- Import order is enforced by `simple-import-sort` (styles always last); components use named exports.

## Decided project rules (owner-approved, 2026-08-20)

These were explicitly decided by the project owner — follow them in all new code:

- **Named exports only** for new components/modules (the lone `SelectedItemList` default export is legacy).
- **Prefer the `@/` alias** over relative imports (existing relative sibling imports are fine to leave).
- **Use `Modal` and `InputBox`** for new work — `InputField` and `Captcha` are legacy; do not use them. (`NewModal` was the second modal implementation and has been removed; every modal now goes through `Modal`.)
- **New reusable hooks go in `src/hooks/`** (create the folder on first use); existing hooks in `src/api/queries/` stay where they are.
- **Keep the mirrored `src/styles/` tree** — do not co-locate styles.
- **Keep the POST-RPC API pattern** for all new endpoints; do not introduce REST-style routes.
- **Mutations**: the raw `axiosInstance.post` + toast + `addTriggerTable()` + `removeModal()` sequence is the standard; `useMutation` only where it already exists.
- **Refetch via the trigger-counter pattern**, never `queryClient.invalidateQueries`.
- **New query hook files**: `useGet<Domain>Queries.ts` (plural, multi-hook).
- **Language**: all new code comments and documentation in **English** (existing Turkish comments stay untouched).
- **i18n**: every new key goes into **all four locales** (tr/en/de/ru); machine-translate de/ru with best effort and flag them for review.
- Known configuration debt (docs/conventions.md) stays as-is until the owner explicitly requests a cleanup.

## Building a new domain feature

Copy the **trains** domain end-to-end — it is the reference implementation: `src/app/[locale]/tren-yonetimi/page.tsx` → `src/components/trains/` (ListBody + create/ + edit/) → `src/consts/trainsConsts.tsx` + `modals.ts` → `src/utils/trainsListTableUtils.tsx` + `validations/trainFormValidation.ts` → `src/api/queries/useGetTrainsQueries.ts` → `src/app/api/trains/route.ts` → `src/api/handlers/trainQueries.ts` → `endpoints.ts` → `src/types/trainsTypes.ts` → locale JSONs. Step-by-step details in [docs/api-layer.md](docs/api-layer.md) and [docs/frontend-patterns.md](docs/frontend-patterns.md).
