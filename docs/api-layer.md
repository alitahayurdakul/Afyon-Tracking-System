# API Layer

## The 4-layer chain (repeated for every domain)

Every domain (trains, wagons, stages, sub-stages, processes, users, roles, materials, projects, reasons, workflows, ...) follows the same RPC-style chain. **All operations — including reads — go through `POST`** with a `type` discriminator; the route handlers are dispatchers, not REST resources.

> ✔ **Owner decision (2026-08-20): this POST-RPC pattern is the rule for all new endpoints.** Do not introduce REST-style routes (e.g. GET handlers) for new domains.

### 1. Client hook — `src/api/queries/use*.ts`

`"use client"` TanStack Query hooks. Reads use `useQuery`; the `queryKey` includes the table-trigger counter from Redux (see [frontend-patterns.md](frontend-patterns.md#table-refetch-trigger-pattern)):

```ts
const trigger = useSelector((s: RootState) => s.tableTrigger.triggerTrainTableTrigger);
return useQuery({
  queryKey: [`getTrainsAllDatas`, trigger],
  queryFn: async () => {
    const { data } = await axiosInstance.post<ITrainsType>(
      CLIENT_END_POINTS.train.getAll,
      { type: TrainQueryTypes.getAllTrains },
    );
    return data;
  },
});
```

### 2. Route Handler — `src/app/api/<domain>/route.ts`

A single exported `POST` that switches on the `type` field. **The `*QueryTypes` enum is defined in the route file itself** and imported back by the client hooks (e.g. `import { TrainQueryTypes } from "@/app/api/trains/route"`).

```ts
export enum TrainQueryTypes { getAllTrains = "GET_ALL_TRAINS", createTrain = "CREATE_TRAIN", ... }

export async function POST(request: NextRequest) {
  const { id, params, type, pageSize, currentPage } = await request.json();
  switch (type) {
    case TrainQueryTypes.createTrain: return await trainHandlers.createTrain(params);
    ...
    default: return Response.json({ message: "There is no method handler..." }, { status: 400 });
  }
}
```

### 3. Handler — `src/api/handlers/<domain>Queries.ts`

Exports a `<domain>Handlers` object of functions. Each calls the external backend with `axiosInstance` using URLs from `END_POINTS`, and wraps the result with `responseHelpers.ts`:

- `createJsonSuccess(data, status)` → `{ success: true, data }`
- `createJsonError(message, status)` → `{ success: false, error }`
- `createJsonOnlyData(data)` → raw passthrough
- `extractErrorMessage(err)` → digs message out of axios error shapes (`response.data`, `.message`, `.error`)

### 4. External backend

Base URL from `process.env.API_URL`. Backend paths look like `/api/trains`, `/api/processes/...`, `/api/favorite-processes` (= "workflows" in the UI).

## Endpoint constants — `src/consts/endpoints.ts`

Two parallel maps, both keyed by domain:

- `END_POINTS` — **absolute backend URLs** (`${API_URL}/api/...`), used only in handlers. Paginated getters take `{ currentPage, pageSize }`.
- `CLIENT_END_POINTS` — **relative internal URLs** (`/api/trains`, ...), used only in client hooks.

## Auth

- **Access token lives in memory only** — module-level variable in `src/redux/slices/authSlice.ts` (`getAccessTokenInMemory`/`setAccessTokenInMemory`) mirrored into Redux state. The `setAccessToken` reducer also decodes the JWT and stores the `UserInfo` payload claim (`id`, `email`, `fullname`, `role.roleName`, `role.permissions`) as `state.auth.user`.
- **Refresh token** is an httpOnly cookie managed by the backend.
- `src/api/axiosInstance.ts`:
  - Request interceptor attaches `Authorization: Bearer <token>` in the browser.
  - Response interceptor refresh-retries **once** on 401 **or 403** — the backend's `verifyJWT` returns **403 for expired/invalid tokens**, not 401. A genuine permission denial simply 403s again after the single retry. Refresh calls are deduplicated through a shared `refreshPromise`.
- `src/app/api/auth/_cookieForward.ts` — `forwardSetCookies` copies backend `Set-Cookie` headers onto the Next response; in dev it rewrites cookies for localhost (drops `Domain` and `Secure`, forces `SameSite=Lax`).
- `src/api/serverAxios.ts` — `createServerAxios(request)` builds an axios instance forwarding the incoming request's `Authorization` and `Cookie` headers, for handlers that need the caller's identity.
- `src/components/auth/AuthBootstrap.tsx` (mounted in providers) runs a one-time session check (refresh call) before rendering, and redirects: unauthenticated users → `/login`; authenticated users on public paths (`/login`, `/forgot-password`) → active processes.

## Permissions

`src/consts/permissions.ts` defines the `Permission` template type `` `${resource}:${action}` `` with resources `activeProcess | user | role | stage` and actions `read | write | delete | manage` (manage = all ops incl. create). Check with `useHasRole().hasPermission(required: string[], requireAll = false)` (`src/api/queries/useHasRole.ts`), which reads `state.auth.user.role.permissions`.

## Checklist: adding a new domain endpoint

1. `src/consts/endpoints.ts` — add backend URL(s) to `END_POINTS.<domain>` and the relative route to `CLIENT_END_POINTS.<domain>`.
2. `src/api/handlers/<domain>Queries.ts` — add the handler function; wrap responses with `responseHelpers`.
3. `src/app/api/<domain>/route.ts` — add an enum member and a `switch` case.
4. `src/api/queries/useGet<Domain>Queries.ts` — add the `useQuery` hook (include the domain's table trigger in `queryKey` for table data) or call `axiosInstance.post` directly from the form for mutations.
5. `src/types/<domain>Types.ts` — add/extend the interfaces.

Note on audit fields: `creator`/`editor` values are currently supplied **client-side** from `useCurrentUserName()` when building mutation params (see `CreateTrainForm`). Follow this existing behavior for new mutations unless the owner decides otherwise.
