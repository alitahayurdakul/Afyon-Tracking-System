# Frontend Patterns

## Anatomy of a domain list page

Pages under `src/app/[locale]/<turkish-slug>/page.tsx` are **thin server components**:

```tsx
export default function TrainsPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <TrainsListBody />
    </div>
  );
}
```

All real work happens in `src/components/<domain>/<Domain>ListBody.tsx` (`"use client"`):

- `useTranslations("<domain>")` for copy
- `usePaginationParams()` for URL-driven pagination
- `useGet<Domain>TableDataQuery({ currentPage, pageSize })` for data
- `currentPageController(currentPage, totalPages)` clamps out-of-range pages, with a `useEffect` that snaps the URL back
- Renders shared `Table` + `Pagination` + `Create<Domain>Modal`

Use the **trains** domain (`src/components/trains/`) as the reference implementation when building a new domain.

## Modal system (URL-driven)

Modal visibility is controlled by the `?modal=<NAME>` query param, **not** by local state alone.

- Names are constants in `src/consts/modals.ts` (e.g. `CREATE_TRAIN_MODAL`).
- The shared `Modal` (`src/components/common/Modal.tsx`, Radix Dialog) opens when the URL param matches its `name` prop (`enableParams={true}`).
- Open: `useAddQueryParam()("modal", CREATE_TRAIN_MODAL)`; close: `useRemoveQueryParamModal()()`. Both live in `src/utils/searchParams.ts`.
- **Important:** these hooks intentionally use `window.history.replaceState`, not `router.replace`. The App Router client cache served stale search params on repeat navigations to the same clean URL, which broke closing the modal a second time (especially in Vercel prod builds). `replaceState` is instrumented by Next and bypasses the RSC cache. Do not "clean this up" into `router.replace` — the rationale is documented in a comment in that file.
- Per-domain create/edit UIs live in `create/` and `edit/` subfolders: a `*Modal.tsx` (button + `<Modal>`) wrapping a `*Form.tsx`.

## Forms

react-hook-form + `yupResolver`, config-driven:

- **Field definitions** are const arrays in `src/consts/<domain>Consts.tsx` (`IFormFieldsType`): `{ name, type: "input" | "textarea" | "select" | ..., label, isRequired, maxLength, ... }`. The form component maps over them and renders the matching `formElements` component (`InputBox`, `SelectBox`, `TextAreaBox`, `Checkbox`...).
- **Validation schemas** are translator-taking factories in `src/utils/validations/<domain>FormValidation.ts`: `<Domain>FormValidation(t): Yup.ObjectSchema<IForm...>`, with messages resolved from the `layout.validation-errors` translation namespace (`useTranslations("layout.validation-errors")`).

### Buttons

✔ **Rule: every `<button>` declares an explicit `type`.** HTML defaults a button inside a form to `type="submit"`, and the shared `Button` component (`src/components/formElements/Button.tsx`) already guards against this — it takes `buttonType` with a `"button"` default. Raw `<button>` elements do not.

This was not theoretical. Both profile forms put a confirmation popover inside `<form>`, and `Popover.Content` is not portaled, so its buttons really are inside the form in the DOM. The **"Hayır"** button had no `type`, so declining the confirmation submitted the form natively — and since the form has neither `action` nor `onSubmit`, the browser issued a GET to the current URL with every named input serialised into the query string. On `PasswordForm` those inputs are the password fields. The "Evet" button escaped only because `handleSubmit` calls `preventDefault` for it.

Prefer the shared `Button`; when a raw `<button>` is unavoidable, write `type="button"` unless it is genuinely meant to submit.

### Mutation flow (the standard onSubmit)

✔ **Owner decision: raw `axiosInstance.post` inside `onSubmit` is the standard for new mutations** — not `useMutation` (the few `useMutation` usages in `useGetProcessesQueries` / auth / forgot-password are grandfathered, not a pattern to extend). The success path is always the same sequence:

```ts
await axiosInstance.post(CLIENT_END_POINTS.train.create, { type: TrainQueryTypes.createTrain, params });
dispatch(addToastify({ message: t("form.notifications.createSuccess"), type: "success", icon: "close", id: "createTrain" + Date.now() }));
reset();
dispatch(addTriggerTable());   // forces the table to refetch — see below
removeModal();                 // closes the URL-driven modal
```

✔ **Rule: do not wrap `onSubmit` in `useCallback`.** It is only ever used as `handleSubmit(onSubmit)` inside JSX, and `handleSubmit()` returns a new function on every render anyway — so the memoisation buys nothing while the dependency array silently goes stale. Twenty-one forms had `[]` or `[id]` there while closing over `currentUserName`, `t`, `dispatch`, `reset` and `removeModal`; because `currentUserName` only arrives after the auth bootstrap resolves, a form opened early kept submitting `creator: "-"` forever. Two *edit* forms captured a stale `id` the same way. Plain `const onSubmit: SubmitHandler<T> = async (data) => {...}` removes the whole failure mode.

The error path dispatches an error toast whose message comes from ✔ **`extractApiError(err, t("...error"))`** — never from `(err as Error)?.message`, which is axios's own text ("Request failed with status code 409") and hides whatever the backend actually said. See [api-layer.md](api-layer.md#what-a-caller-is-allowed-to-see) for which messages survive the proxy.

## Tables & pagination

- Shared wrapper: `src/components/common/Table.tsx` (TanStack Table) — takes `data`, `columns`, `loading`, `isError`, pagination props, and a `paginationElement` render prop for the shared `Pagination`.
- **Column definitions** are factories in `src/utils/<domain>ListTableUtils.tsx`: `create<Domain>TableColumns(t)` plus a plain `ICommonTableColumnsTypes` array of `{ name, label }`. Action columns are separate components (`<Domain>TableActionsCol.tsx`).
- `usePaginationParams({ defaultPageSize?, paramPrefix? })` (`src/api/queries/usePaginationParams.ts`) reads/writes `page` / `pageSize` URL params (prefixable as `<prefix>_page` for multiple tables on one page). **Pagination is 1-indexed everywhere** — no ±1 conversions anywhere; changing page size resets to page 1. Defaults come from `src/consts/tableConsts.ts` (`DEFAULT_PAGE_SIZE`, `DEFAULT_PAGE_SIZE_OPTIONS`).
- Loading states use `react-loading-skeleton` (`components/common/loaders/`).

## Error and not-found boundaries

Four files cover failure states; there were none before, so any render throw blanked the app.

| File | Catches |
|---|---|
| `src/app/[locale]/error.tsx` | anything thrown below the locale layout — has translations and a `reset()` retry |
| `src/app/global-error.tsx` | a throw in the **root layout itself**, where providers/i18n/stylesheets are unavailable |
| `src/app/not-found.tsx` | unmatched URLs (what Next actually renders for a 404) |
| `src/app/[locale]/not-found.tsx` | `notFound()` called from inside the locale segment |

Two things about the 404 that are easy to get wrong:

- **The root file is the one that runs for a wrong URL.** An unmatched path never enters `[locale]`, so it sits above `NextIntlClientProvider`. It resolves the locale itself from the `NEXT_LOCALE` cookie the proxy sets and calls `getTranslations({ locale })`.
- ✔ **Do not add a `[locale]/[...rest]` catch-all to get translations there.** It works, but the route then *matches*, so Next commits a 200 before `notFound()` runs and every 404 becomes a soft 404. This was tried and reverted; correct status beats a shorter file.

### Document structure and metadata

`<html>`/`<body>` are rendered by **`app/[locale]/layout.tsx`**, not by the root layout, which is a pass-through. That is deliberate: `lang` has to match the locale (screen readers use it to pick pronunciation), and the locale is only a build-time value inside `[locale]`. Resolving it in the root layout with `cookies()` works but makes **every page dynamic**.

✔ **Rule: never use a dynamic API (`cookies()`, `headers()`) in `app/layout.tsx` or `app/not-found.tsx`.** In the global not-found this is especially costly — it opts the *entire app* out of static generation, not just that route. This was measured: 14 static groups dropped to 0.

Because the root layout no longer supplies a document, `app/not-found.tsx` and `app/global-error.tsx` render their own `<html>`/`<body>` with inline styles.

Titles come from `generateMetadata` in the locale layout, reading `layout.meta` from the message catalogue. ✔ **Call `setRequestLocale(locale)` before `getTranslations` there** or next-intl treats the render as dynamic. The app is sign-in only, so metadata also sets `robots: { index: false, follow: false }`.

`global-error.tsx` is deliberately self-contained — default-locale copy and inline styles — because nothing it could import is guaranteed to have loaded.


### Body scroll lock

✔ **Rule: never write to `document.body.style` for scroll locking.** Use `useBodyScrollLock(locked)` (`src/api/queries/useBodyScrollLock.ts`), which is refcounted and restores the original values.

There used to be four competing implementations. `Modal` had its own, and it was wrong twice over: it set a **negative** `paddingRight` (invalid CSS, so the scrollbar gap was never compensated and the page shifted), and its cleanup cleared `overflow`/`paddingRight` unconditionally — so closing a create modal released the lock still held by an open `NewModal` or the mobile drawer, and the page scrolled behind them. `Modal` and `VerifyCodeModal` now both go through the shared hook.


## State management

### Redux (`src/redux/store.ts`)

| Slice | Key | Purpose |
|---|---|---|
| `authSlice` | `auth` | access token + decoded JWT `UserInfo` (see [api-layer.md](api-layer.md#auth)) |
| `toastSlice` | `toast` | toast queue (`addToastify` / `removeToastify` / `clearToastify`) |
| `commonSlice` | `common` | UI flags (`setPhoneSize`) |
| `triggerTableSlices` | `tableTrigger` | per-domain refetch counters |

### Table refetch trigger pattern

✔ **Owner decision: refetch is NEVER done with `queryClient.invalidateQueries` — the trigger pattern is mandatory for new code.** `triggerTableSlices` holds **one counter per domain** (`TRIGGER_DOMAINS`); query hooks include their own domain's counter in their `queryKey`; mutations dispatch `addTriggerTable("<domain>")` to bump it, which changes the key and makes React Query refetch.

Two rules keep it correct:

- ✔ **A hook subscribes to the domain of the file it lives in.** Every `*OptionsQuery` sits in the file of the domain that owns the data (wagon options are in `useGetWagonsQueries`), so this is right even when the consumer is another domain's form.
- ✔ **A mutation passes the domain whose records it changes** — `profile` forms pass `"users"`, `processHistory` and `activeProcessDetail` pass `"processes"`.

Anything that *embeds* another domain's records is declared once, in the `CASCADES` map in the slice, instead of at the call sites: stage detail embeds its sub-stages, workflow detail embeds its stages, the user table renders the role name, and so on. Extend that map rather than dispatching twice.

Until this was split, a single shared counter served every domain, so saving a wagon changed the key of all ~41 queries in the app. Little of that refetched immediately — React Query only refetches mounted queries — but the whole cache became unreachable, so `staleTime: 60_000` was effectively cancelled app-wide by any mutation. Per domain, a save now invalidates between 2 and 13 queries instead of 41.

### TanStack Query

Configured in `src/app/[locale]/providers.tsx`: `staleTime: 60_000`, `refetchOnWindowFocus: false`, `retry: 1`. Provider order: `Redux Provider > QueryClientProvider > AuthBootstrap > children + NotificationProvider`.

## Notifications

Redux-driven Radix toasts: dispatch `addToastify(IToastElement)` from anywhere; `src/components/notification/NotificationProvider.tsx` renders `ErrorNotificationElement` / `SuccessNotificationElement` per toast type. **All toasts are cleared on route change** (pathname effect). Give each toast a unique `id` (convention: `"<action>" + Date.now()`).

## App shell & auth gating

- `AppShell` (`src/components/layout/AppShell.tsx`): renders `Sidebar` + hamburger (mobile), locks body scroll when the drawer is open, and renders bare children on auth routes (`/login`, `/forgot-password`). Sidebar items are declared in `src/consts/sidebarConsts.tsx` with FontAwesome icons and `URL_PAGES` urls; labels are translated by `key`.
- `AuthBootstrap` (`src/components/auth/AuthBootstrap.tsx`): one-time refresh-token session check before rendering the app; redirects unauthenticated → `/login` and authenticated users away from public paths → active processes.
- Permission checks in UI: `useHasRole().hasPermission([...])`.
