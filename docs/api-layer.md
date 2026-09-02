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
  const http = createServerAxios(request);   // forwards the caller's Authorization/Cookie
  switch (type) {
    case TrainQueryTypes.createTrain: return await trainHandlers.createTrain(params, http);
    ...
    default: return Response.json({ message: "There is no method handler..." }, { status: 400 });
  }
}
```

Every route also parses its body through `readJsonBody(request)` (from `responseHelpers`) and returns a 400 when it is missing or malformed, rather than letting `request.json()` throw an unhandled 500.

✔ **Rule: every route builds `const http = createServerAxios(request)` and passes it to each handler as the last argument.** Handlers must never import the module-level `axiosInstance` — its token interceptor is browser-only (`typeof window !== "undefined"`), so server-side it silently sends no credentials at all.

### 3. Handler — `src/api/handlers/<domain>Queries.ts`

Exports a `<domain>Handlers` object of functions. Each takes the request-scoped instance as its **last parameter** (`http: AxiosInstance`), calls the external backend with it using URLs from `END_POINTS`, and wraps the result with `responseHelpers.ts`:

```ts
async function createTrain(params: Record<string, any>, http: AxiosInstance): Promise<Response> {
  const response = await http.post(END_POINTS.train.create, params);
```

Note: a handler that needs an *optional* argument must type it as `arg: T | undefined` rather than `arg?: T`, since a required `http` cannot follow an optional parameter (see `getProjects`).


- `createJsonSuccess(data, status)` → `{ success: true, data }`
- `createJsonError(message, status)` → `{ success: false, error }`
- `createJsonOnlyData(data)` → raw passthrough
- `extractErrorMessage(err)` → the backend's message, **but only for 4xx** (see below)
- `extractErrorStatus(err)` → the upstream status (4xx/5xx), falling back to 500
- `createErrorResponse(err)` → the standard catch-block response: safe message + upstream status, and logs full detail for 5xx

✔ **Rule: every catch block is `return createErrorResponse(err);`.** Never hard-code 500, and never build the response by hand.

### What a caller is allowed to see

| Backend result | Client sees |
|---|---|
| 4xx with a message ("this train number already exists") | that message verbatim |
| 5xx, with or without a body | generic fallback; detail goes to the server log |
| Transport failure (`ECONNREFUSED 10.0.0.5:8080`) | generic fallback; detail goes to the server log |
| 4xx whose body is HTML or over 300 chars | generic fallback (it tells the user nothing) |

The split is deliberate: **4xx describes something the caller can fix**, so the backend's own copy is the best message available. **5xx and transport text are internal details** — they can carry stack traces, HTML error pages, or the backend host and port, and previously all of it was relayed verbatim to anonymous callers. The auth routes (`login`, `refresh`, `logout`) follow the same rule and no longer echo `err.message`.

For the message to actually reach the user, the client form must read it with `extractApiError(err, fallback)` (`src/utils/extractApiError.ts`). ✔ **Never use `(err as Error)?.message` in a form** — that is axios's own English text ("Request failed with status code 409"), and it hides the backend's message entirely.

### Which message the user sees, and in which language

`extractApiError` relays the response body **only for 4xx**; for anything else the caller's `fallback` wins — and every call site passes a `t(...)` value, so those messages follow the selected language.

| Failure | Message shown | Localized? |
|---|---|---|
| 4xx from the backend | the backend's own copy | No — comes from the backend as-is |
| 502 (backend answered in an unexpected shape) | caller's `t(...)` fallback | **Yes** |
| 5xx / transport failure | caller's `t(...)` fallback | **Yes** |

✔ **Rule: our own error strings must never be user-visible.** Placeholders like `"Failed to create train"` are English developer text, so any response carrying one uses a status that `extractApiError` refuses to relay (502 for an unexpected upstream response, 5xx for a fault). Returning such a string with a 4xx would print untranslated English into a Turkish UI.

The one remaining gap is outside the frontend: **the backend's 4xx messages are single-language**, so a user on `/en` still sees them in whatever language the backend emits. Fixing that requires either translated messages or message codes from the backend.

### Login errors

`LoginCard` maps the status itself rather than relaying whatever came back:

- **400 / 401 → `layout.login.invalidCredentials`** ("E-posta veya şifre hatalı"). ✔ **Keep this message combined.** Saying "no such account" separately would reveal which e-mail addresses are registered.
- **Other 4xx** → `extractApiError`, so a specific backend message (locked account, etc.) still shows.
- **5xx / no response → `layout.login.unavailable`.** The auth routes' own fallback text is a non-localised placeholder, so the client substitutes its translated copy instead of displaying it.

The forgot-password flow already follows the same shape via `extractApiError` with localized fallbacks (`sendError`, `invalidCode`, `resendError`). Flattening every failure to 500 hid the difference between "not found", "forbidden" and a real fault — and critically, it meant `axiosInstance` never saw the 401/403 that triggers its refresh-and-retry, so an expired token surfaced as a generic error instead of silently refreshing.

✔ **Rule: never return an error body with a 2xx status.** axios rejects on non-2xx, so a resolved response is already a success; an error payload sent with HTTP 200 makes the client show a success toast for a failed call.

### 4. External backend

Base URL from `process.env.API_URL`. Backend paths look like `/api/trains`, `/api/processes/...`, `/api/favorite-processes` (= "workflows" in the UI).

## Endpoint constants — `src/consts/endpoints.ts`

Two parallel maps, both keyed by domain:

- `END_POINTS` — **absolute backend URLs** (`${API_URL}/api/...`), used only in handlers. Paginated getters take `{ currentPage, pageSize }`.
- `CLIENT_END_POINTS` — **relative internal URLs** (`/api/trains`, ...), used only in client hooks.

✔ **Rule: never interpolate a client-supplied value into an `END_POINTS` URL raw.** The file provides three helpers and every builder uses them:

- `enc(value)` — `encodeURIComponent` for path segments and query values; throws `"Missing required URL parameter"` on an empty value so a missing id fails instead of requesting `.../undefined`. Without it an id like `../../internal/wipe` or `1?admin=true` would change which backend path is actually called.
- `pageNumber(value)` / `pageSizeOf(value)` — coerce pagination input to a positive integer, falling back to defaults and capping page size at `MAX_PAGE_SIZE` (200).

The `statistics.*` builders still take a pre-built query string and are deliberately not encoded — they are currently unused; encode at the call site if they are ever wired up.

## Auth

- **Access token lives in memory only** — module-level variable in `src/redux/slices/authSlice.ts` (`getAccessTokenInMemory`/`setAccessTokenInMemory`) mirrored into Redux state. The `setAccessToken` reducer also decodes the JWT and stores the `UserInfo` payload claim (`id`, `email`, `fullname`, `role.roleName`, `role.permissions`) as `state.auth.user`.
- **Refresh token** is an httpOnly cookie managed by the backend.
- `src/api/axiosInstance.ts` — **browser only**; never import it in a Route Handler or handler module:
  - Request interceptor attaches `Authorization: Bearer <token>` in the browser.
  - Response interceptor refresh-retries **once** on 401 **or 403** — the backend's `verifyJWT` returns **403 for expired/invalid tokens**, not 401. A genuine permission denial simply 403s again after the single retry. Refresh calls are deduplicated through a shared `refreshPromise`.
- `src/app/api/auth/_cookieForward.ts` — `forwardSetCookies` copies backend `Set-Cookie` headers onto the Next response; in dev it rewrites cookies for localhost (drops `Domain` and `Secure`, forces `SameSite=Lax`).
- `src/api/serverAxios.ts` — `createServerAxios(request)` builds an axios instance forwarding the incoming request's `Authorization` and `Cookie` headers. **This is the only way handlers talk to the backend**; every route builds one per request and passes it down.
- `src/components/auth/AuthBootstrap.tsx` (mounted in providers) runs a one-time session check (refresh call) before rendering, and redirects: unauthenticated users → `/login`; authenticated users on public paths (`/login`, `/forgot-password`) → active processes.

### Route protection (two layers)

1. **Server-side gate — `src/proxy.ts`.** Redirects to `/login` when the `jwt` session cookie is absent and the path is not public, preserving the locale prefix (`/en/tren-yonetimi` → `/en/login`). This is a **presence check, not a validity check** — the frontend cannot verify the signature, so the backend remains the authority. Its value: protected pages are never served to an anonymous request, and this holds with JavaScript disabled.
2. **Client-side gate — `AuthBootstrap`.** Performs the actual refresh call and handles the "already signed in → skip `/login`" direction.

✔ **Rule: the proxy must never redirect *away* from a public path.** A present-but-expired cookie would send the user into the app, `AuthBootstrap` would bounce them back to `/login`, and the two gates would loop. Only the client knows whether a refresh succeeded.

✔ **Rule: public routes are defined once**, in `PUBLIC_PATHS`/`isPublicPath` (`src/consts/url.ts`), and imported by both gates. Diverging lists cause redirect loops. The cookie name lives beside them as `SESSION_COOKIE_NAME`.

Verified behaviour (production build, no cookie → 307; with cookie → 200): protected and locale-prefixed paths redirect, `/login`, `/forgot-password` and `/forgot-password/reset` stay reachable, and an empty `jwt=` value (what logout writes) counts as no session.

## Permissions

`src/consts/permissions.ts` defines the `Permission` template type `` `${resource}:${action}` `` with one resource per module (`processTrain | activeProcess | processStage | processHistory | workflow | stage | subStage | project | train | wagon | material | delayReason | user | role`) and actions `read | write | delete | manage`. Stronger actions imply weaker ones (`manage` ⇒ all, `write` ⇒ `read`), so a role carries only the strongest permission per resource. Check with `usePermissions().can(resource, action)` (`src/hooks/usePermissions.ts`) or `<RoleWrapper resource action>`; both read `state.auth.user.role.permissions`. `useHasRole().hasPermission(required: string[], requireAll = false)` still works and delegates to the same logic.

The resources, the five role presets from the owner's permission matrix, and every place gating is applied are documented in [permissions.md](permissions.md).

## Checklist: adding a new domain endpoint

1. `src/consts/endpoints.ts` — add backend URL(s) to `END_POINTS.<domain>` and the relative route to `CLIENT_END_POINTS.<domain>`.
2. `src/api/handlers/<domain>Queries.ts` — add the handler function taking `http: AxiosInstance` last; call the backend through `http`; wrap responses with `responseHelpers`.
3. `src/app/api/<domain>/route.ts` — add an enum member and a `switch` case.
4. `src/api/queries/useGet<Domain>Queries.ts` — add the `useQuery` hook (include the domain's table trigger in `queryKey` for table data) or call `axiosInstance.post` directly from the form for mutations.
5. `src/types/<domain>Types.ts` — add/extend the interfaces.

Note on audit fields: `creator`/`editor` values are currently supplied **client-side** from `useCurrentUserName()` when building mutation params (see `CreateTrainForm`). Follow this existing behavior for new mutations unless the owner decides otherwise.
