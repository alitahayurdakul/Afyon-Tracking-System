# Known Issues

Everything observed and verified as of 2026-08-20. ✔ **Owner rule: none of these may be fixed without an explicit request** — do not fix them as drive-by changes while doing unrelated work. When a task touches one of these areas, mention the issue in the task summary instead.

## Broken

1. **`npm run lint-fix` fails** — it calls `next lint`, which was removed in Next.js 16. Workaround: `npx eslint . --fix`.

## Configuration debt

2. **`eslint-config-next` installed but never extended** in `eslint.config.mjs`. The config also references `@next/next/no-img-element` without registering that plugin, and imports `@typescript-eslint/parser`/`eslint-plugin` which exist only **transitively** through `eslint-config-next` — uninstalling it would break linting entirely. Next.js-specific rules (core-web-vitals) are not applied.
3. **Prettier wiring is dead** — `eslint-plugin-prettier` is registered but the `prettier/prettier` rule is never enabled; no `.prettierrc`; no format script. Formatting is not enforced anywhere.
4. **Dev-only tooling in `dependencies`** — `eslint-plugin-prettier`, `eslint-plugin-react`, `eslint-plugin-simple-import-sort`, and `husky` belong in `devDependencies`.
5. **Unused dependencies** — `recharts` (only the orphaned `src/utils/tickFormatter.ts` helper remains), `@next/third-parties`, `cookies-next`.
6. **Two active global stylesheets** — `src/styles/globals.scss` (root layout) and the create-next-app leftover `src/app/globals.css` (`[locale]` layout). The latter's `--background`/`--foreground` variables and `prefers-color-scheme: dark` block overlap with the real token set in `globals.scss`.
7. **Dead config in `next.config.ts`** — `/ürünler → /urunler` redirects (no such routes in this app) and a commented-out `qrbackend.tr` image `remotePatterns` block, both copied from another project.
8. **`API_URL` fallback is the literal string `"api"`** (`src/consts/endpoints.ts`) — a missing env var produces confusing relative-URL failures instead of a loud error.
9. **Stray lockfile in the parent folder** — `../package-lock.json` (97 bytes, next to the repo) makes Next/Turbopack infer the wrong workspace root; every build prints a "multiple lockfiles" warning suggesting `turbopack.root`.

## Tooling behavior

10. **Husky pre-commit does not re-stage eslint fixes** — it runs `npx eslint . --fix` then `npm run build`, but auto-fixed files are not `git add`ed, so fixes land as unstaged changes while the unfixed version is committed. The full build also makes every commit slow.
11. **Git identity is not configured** — commits use the auto-derived `alitahayurdakul@Ali-MacBook-Air.local`; git prints a warning on every commit.

## Code smells (observed, not fixed)

12. **`CreateTrainForm.onSubmit` has an empty `useCallback` dependency array** (`src/components/trains/create/CreateTrainForm.tsx:104`) while closing over `t`, `currentUserName`, `dispatch`, and `removeModal` — stale-closure risk if those ever change between renders. Other domain forms may replicate this; check when working on any of them.
13. **ESLint warning in `InputBox.tsx:111`** — `currentValueWithoutPunctuation` assigned but never used.
14. **Misplaced files** — `useBodyScrollLock.ts` (UI hook) lives in `src/api/queries/`; `src/mocks/` is an empty directory.
15. **`SelectedItemList` is the codebase's only default export** — legacy; the named-export rule applies to everything new.

## Intentionally parked (not bugs)

- **Commented-out code is deliberate** — search bars, dashboard/statistics sidebar items, and the role-name check in `useHasRole` are parked features. Leave them unless asked.
- **The 401/403 refresh-retry in `axiosInstance`** looks odd but is required: the backend returns 403 for expired tokens (see [api-layer.md](api-layer.md#auth)).
- **`window.history.replaceState` in `src/utils/searchParams.ts`** is a deliberate App Router cache workaround, not a smell (see [frontend-patterns.md](frontend-patterns.md#modal-system-url-driven)).
