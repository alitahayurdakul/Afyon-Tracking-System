# Conventions, Tooling & Known Issues

> The rules below are **binding** for new code. Owner-approved decisions (2026-08-20) are marked ✔; the rest is observed convention to follow for consistency.

## Decided rules ✔

- **Exports**: named exports only. `SelectedItemList`'s default export is legacy — don't replicate it.
- **Imports**: prefer the `@/` alias over relative paths in new code (existing relative sibling imports may remain).
- **Hooks**: new reusable hooks go in `src/hooks/` (create on first use). The hooks currently in `src/api/queries/` (`usePaginationParams`, `useHasRole`, `useBodyScrollLock`) stay put.
- **Language**: new code comments and all documentation in English. Existing Turkish comments are not to be translated or removed.
- **Legacy components**: `NewModal`, `InputField`, `Captcha` must not be used in new work — use `Modal` and `InputBox`.
- **Query hook files**: standardize on `useGet<Domain>Queries.ts` (plural, containing all of the domain's hooks); the singular `useGetStageDetailDataQuery.ts` style is legacy.
- **Configuration debt** (bottom of this file): leave untouched until the owner explicitly requests a cleanup. Never fix these as drive-by changes.
- **Production code is never modified without an explicit owner request** — documentation changes are always allowed, code changes are not.

## Git workflow (observed — branch/merge policy not yet confirmed by owner)

Current working branch is `claudeForAfyon`. Commit messages are short English prefixed summaries (`feat: ...`, `edit: ...`, `docs: ...`). The merge target and branching policy have not been stated — ask before merging or creating branches.

## Naming conventions

- Types: `I`-prefixed interfaces in `src/types/<domain>Types.ts` (`ITrainType`, `ITrainFormDataTypes`); `T`-prefix for type aliases (`TValidationTranslator`).
- Query hooks: `useGet<Domain>Queries.ts` exporting `useGet<Domain>DataQuery`, `useGetTable<Domain>DataQuery`, `useGet<Domain>OptionsQuery`.
- Route enums: `<Domain>QueryTypes` with `SCREAMING_SNAKE` string values, defined in the route file.
- Handlers: `<domain>Handlers` object exported from `src/api/handlers/<domain>Queries.ts`.
- Table columns: `create<Domain>TableColumns(t)` in `src/utils/<domain>ListTableUtils.tsx`.
- Validation: `<Domain>FormValidation(t)` in `src/utils/validations/`.
- SCSS class names: kebab-case, accessed as `styles["page-container"]`.
- Components: named exports (not default), PascalCase files.

## Linting & formatting

- Flat config in `eslint.config.mjs`; ignores `.next/` and `src/utils/enum/`.
- **Import order is enforced** by `simple-import-sort` with custom groups: react/next/3rd-party → `@scope` packages → `@/` alias → `~` → parent-relative → same-dir relative → images (png/svg) → side-effects → **styles always last**.
- Other notable rules: `no-duplicate-imports: error`; unused vars warn but `_`-prefixed are ignored; `react/react-in-jsx-scope` off.
- Prettier is installed and its ESLint plugin registered, but the `prettier/prettier` rule is **not enabled** and there is no `.prettierrc` — formatting is effectively not enforced.

## Git hooks & scripts

- `.husky/pre-commit` runs `npx eslint . --fix` followed by `npm run build`. Consequences: commits are slow, fail on build errors, and eslint auto-fixes are **not re-staged** (they remain as unstaged changes).
- Scripts: `dev`, `build`, `start`, `lint` (`eslint`), `lint-fix` (**broken** — uses `next lint`, removed in Next 16).

## TypeScript

- `strict: true`; path alias `@/* → ./src/*`; plus a `"react": ["./node_modules/@types/react"]` override (duplicate-React-types workaround).
- `allowJs: true` though the codebase is all TS.

## Known issues / configuration debt (as of 2026-08-20)

Do not silently "fix" these while doing unrelated work, but be aware of them:

1. `lint-fix` script is broken (`next lint` no longer exists in Next 16).
2. `eslint-config-next` is installed but never extended in the flat config; the config references `@next/next/no-img-element` without registering the plugin, and `@typescript-eslint/*` are only available **transitively** through it — removing the package would break linting.
3. Prettier wiring is dead (plugin registered, rule never enabled, no config file).
4. Dev-only tooling (`eslint-plugin-*`, `husky`) sits in `dependencies` instead of `devDependencies`.
5. Unused dependencies: `recharts` (only the orphaned `src/utils/tickFormatter.ts` remains), `@next/third-parties`, `cookies-next`.
6. Two active global stylesheets: `src/styles/globals.scss` (root layout) **and** the create-next-app leftover `src/app/globals.css` (`[locale]` layout) with overlapping variables/dark-mode rules.
7. Dead config in `next.config.ts`: `/ürünler → /urunler` redirects (no such routes here) and a commented-out `qrbackend.tr` image pattern — both copied from another project.
8. `src/mocks/` is empty; `useBodyScrollLock.ts` is a UI hook misfiled under `src/api/queries/`.
9. `END_POINTS` falls back to the literal `"api"` when `API_URL` is unset — fails confusingly instead of loudly.
10. Commented-out code is common (search bars, dashboard sidebar items, role-name checks in `useHasRole`) — these are intentionally parked features, not accidents; leave them unless asked.
