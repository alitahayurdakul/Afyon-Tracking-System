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

### Mutation flow (the standard onSubmit)

✔ **Owner decision: raw `axiosInstance.post` inside `onSubmit` is the standard for new mutations** — not `useMutation` (the few `useMutation` usages in `useGetProcessesQueries` / auth / forgot-password are grandfathered, not a pattern to extend). The success path is always the same sequence:

```ts
await axiosInstance.post(CLIENT_END_POINTS.train.create, { type: TrainQueryTypes.createTrain, params });
dispatch(addToastify({ message: t("form.notifications.createSuccess"), type: "success", icon: "close", id: "createTrain" + Date.now() }));
reset();
dispatch(addTriggerTable());   // forces the table to refetch — see below
removeModal();                 // closes the URL-driven modal
```

The error path dispatches an error toast whose message comes from ✔ **`extractApiError(err, t("...error"))`** — never from `(err as Error)?.message`, which is axios's own text ("Request failed with status code 409") and hides whatever the backend actually said. See [api-layer.md](api-layer.md#what-a-caller-is-allowed-to-see) for which messages survive the proxy.

## Tables & pagination

- Shared wrapper: `src/components/common/Table.tsx` (TanStack Table) — takes `data`, `columns`, `loading`, `isError`, pagination props, and a `paginationElement` render prop for the shared `Pagination`.
- **Column definitions** are factories in `src/utils/<domain>ListTableUtils.tsx`: `create<Domain>TableColumns(t)` plus a plain `ICommonTableColumnsTypes` array of `{ name, label }`. Action columns are separate components (`<Domain>TableActionsCol.tsx`).
- `usePaginationParams({ defaultPageSize?, paramPrefix? })` (`src/api/queries/usePaginationParams.ts`) reads/writes `page` / `pageSize` URL params (prefixable as `<prefix>_page` for multiple tables on one page). **Pagination is 1-indexed everywhere** — no ±1 conversions anywhere; changing page size resets to page 1. Defaults come from `src/consts/tableConsts.ts` (`DEFAULT_PAGE_SIZE`, `DEFAULT_PAGE_SIZE_OPTIONS`).
- Loading states use `react-loading-skeleton` (`components/common/loaders/`).

## State management

### Redux (`src/redux/store.ts`)

| Slice | Key | Purpose |
|---|---|---|
| `authSlice` | `auth` | access token + decoded JWT `UserInfo` (see [api-layer.md](api-layer.md#auth)) |
| `toastSlice` | `toast` | toast queue (`addToastify` / `removeToastify` / `clearToastify`) |
| `commonSlice` | `common` | UI flags (`setPhoneSize`) |
| `triggerTableSlices` | `tableTrigger` | per-domain refetch counters |

### Table refetch trigger pattern

✔ **Owner decision: refetch is NEVER done with `queryClient.invalidateQueries` — the trigger pattern is mandatory for new code.** `triggerTableSlices` holds a counter per domain (e.g. `triggerTrainTableTrigger`); table query hooks include it in their `queryKey`; mutations dispatch `addTriggerTable()` to bump it, which changes the key and makes React Query refetch. Follow this pattern when adding new tables/mutations.

### TanStack Query

Configured in `src/app/[locale]/providers.tsx`: `staleTime: 60_000`, `refetchOnWindowFocus: false`, `retry: 1`. Provider order: `Redux Provider > QueryClientProvider > AuthBootstrap > children + NotificationProvider`.

## Notifications

Redux-driven Radix toasts: dispatch `addToastify(IToastElement)` from anywhere; `src/components/notification/NotificationProvider.tsx` renders `ErrorNotificationElement` / `SuccessNotificationElement` per toast type. **All toasts are cleared on route change** (pathname effect). Give each toast a unique `id` (convention: `"<action>" + Date.now()`).

## App shell & auth gating

- `AppShell` (`src/components/layout/AppShell.tsx`): renders `Sidebar` + hamburger (mobile), locks body scroll when the drawer is open, and renders bare children on auth routes (`/login`, `/forgot-password`). Sidebar items are declared in `src/consts/sidebarConsts.tsx` with FontAwesome icons and `URL_PAGES` urls; labels are translated by `key`.
- `AuthBootstrap` (`src/components/auth/AuthBootstrap.tsx`): one-time refresh-token session check before rendering the app; redirects unauthenticated → `/login` and authenticated users away from public paths → active processes.
- Permission checks in UI: `useHasRole().hasPermission([...])`.
