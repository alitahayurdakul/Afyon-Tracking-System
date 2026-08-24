# Architecture Overview

## What this project is

A train fleet / job-tracking frontend ("Afyon job tracking") for TMS. This repo contains **only the frontend and a Next.js API proxy layer** — all persistent data lives in an external REST backend reached via the `API_URL` environment variable (currently `https://afyon-fleet-management.onrender.com`, see `.env`).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.6, App Router, React 19, TypeScript strict |
| Server state | TanStack Query v5 |
| Client state | Redux Toolkit |
| Tables | TanStack Table v8 (wrapped by `src/components/common/Table.tsx`) |
| Forms | react-hook-form + yup (`@hookform/resolvers`) |
| Styling | SCSS modules (no Tailwind) — see [styling.md](styling.md) |
| UI primitives | Radix UI (dialog, popover, toast, tooltip), framer-motion, FontAwesome |
| i18n | next-intl — see [i18n.md](i18n.md) |
| HTTP | axios |

## Folder structure

```
src/
├── app/
│   ├── layout.tsx            # root layout; imports globals.scss, Vercel Analytics
│   ├── [locale]/             # all pages; Turkish slugs (tren-yonetimi, aktif-surecler, ...)
│   │   ├── layout.tsx        # locale layout; Providers + AppShell
│   │   └── providers.tsx     # Redux Provider + QueryClientProvider + AuthBootstrap + NotificationProvider
│   └── api/                  # Route Handlers, one folder per domain (proxy to backend)
├── api/
│   ├── axiosInstance.ts      # client axios: bearer token + 401/403 refresh-retry
│   ├── serverAxios.ts        # createServerAxios(request): forwards Authorization/Cookie headers
│   ├── handlers/             # server-side backend calls (one file per domain)
│   └── queries/              # client-side TanStack Query hooks (one file per domain) + misc hooks
├── components/
│   ├── common/               # Table, Modal, Pagination, Topbar, FilterForm, ...
│   ├── formElements/         # InputBox, SelectBox, TextAreaBox, Checkbox, Button, Badge, ErrorLabel, Option
│   ├── layout/AppShell.tsx   # sidebar shell; skipped on auth routes
│   ├── sidebar/              # Sidebar (items from consts/sidebarConsts.tsx)
│   ├── auth/AuthBootstrap.tsx# session bootstrap + public/private redirects
│   ├── notification/         # Radix toast renderer driven by Redux toastSlice
│   └── <domain>/             # per-domain UI (trains, wagons, stages, users, roles, ...)
│       ├── <Domain>ListBody.tsx
│       ├── create/           # Create<Domain>Modal + Create<Domain>Form
│       └── edit/             # Edit<Domain>Modal + Edit<Domain>Form (+ wrapper)
├── consts/                   # endpoints.ts, url.ts, modals.ts, permissions.ts, sidebarConsts.tsx,
│                             # per-domain form/table const arrays (<domain>Consts.tsx)
├── redux/
│   ├── store.ts              # slices: auth, toast, common, tableTrigger
│   └── slices/
├── i18n/                     # routing.ts (locales), request.ts (message loading)
├── locales/<lang>/<domain>.json
├── styles/                   # SCSS; mirrors the component tree (NOT co-located)
├── types/                    # per-domain interfaces (<domain>Types.ts)
├── utils/                    # table column factories, validations/, searchParams.ts, enum/, helpers
└── proxy.ts                  # middleware (Next 16 "proxy" convention)
```

## Request flow at a glance

```
Client component
  └─ TanStack Query hook (src/api/queries)          — POSTs { type: <enum>, ...params }
       └─ Next Route Handler (src/app/api/<domain>) — switch on the type discriminator
            └─ Handler (src/api/handlers)           — axios call to external backend (END_POINTS)
                 └─ External backend (API_URL)
```

Details in [api-layer.md](api-layer.md). Frontend patterns (pages, modals, forms, tables, state) in [frontend-patterns.md](frontend-patterns.md).

## Environment

- `.env` (gitignored) must define `API_URL`. `src/consts/endpoints.ts` falls back to the literal string `"api"` if it is missing — requests then fail with confusing relative URLs, so set it.
- No test framework exists in this project.
- Husky pre-commit runs `npx eslint . --fix` then `npm run build` — commits fail if the build fails.
