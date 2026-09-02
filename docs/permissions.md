# Permissions & roles

The permission model implements the owner-supplied **Yetki Matrisi** (role-based permission matrix). This document is the binding mapping between that matrix and the code.

## Vocabulary

`src/consts/permissions.ts` defines a permission as `` `${resource}:${action}` ``.

**Resources** (one per functional module):

| Resource | Module / page |
|---|---|
| `processTrain` | Tren Süreçleri (`/tren-surecleri`) |
| `activeProcess` | Aktif Süreçler — the process itself (view tab, create, start, complete, cancel) |
| `processStage` | Data entry inside a running process (sub-stage start/save/complete, stage completion) |
| `processHistory` | Geçmiş Süreçler |
| `workflow` | İş Akışları |
| `stage` | Aşamalar |
| `subStage` | Alt Aşamalar |
| `project` | Projeler |
| `train` | Trenler |
| `wagon` | Vagonlar |
| `material` | Malzeme Listesi |
| `delayReason` | Gecikme Sebepleri |
| `user` | Kullanıcılar (+ Log Kayıtları, which requires `user:manage`) |
| `role` | Roller |

**Actions**: `read` (view), `write` (create + edit), `delete`, `manage` (everything).

**Implication rules** (`grants` / `impliedActions` in `permissions.ts`) — a granted permission covers weaker ones on the same resource:

- `manage` ⇒ `read`, `write`, `delete`, `manage`
- `write` ⇒ `read`, `write`
- `delete` ⇒ `read`, `delete`
- `read` ⇒ `read`

So a role only needs the strongest permission per resource; there is no need to grant `read` alongside `write`.

`activeProcess` and `processStage` are deliberately separate: the matrix lets Saha Personeli enter stage data but **not** create or start a process, and lets Saha Şefi start and complete processes but **not** cancel/delete them (`activeProcess:write`, never `manage`).

## Role presets

`src/consts/rolePresets.ts` encodes the five roles of the matrix. They are **templates**, not fixed roles: roles live in the backend and are created through Rol Yönetimi. Picking a preset in the role form fills the description and the permission multiselect, which can then be adjusted.

| Preset key | Matrix role | Permissions |
|---|---|---|
| `admin` | Yönetici | `manage` on every resource |
| `fieldChief` | Saha Şefi / Ustabaşı | `processTrain:read`, `activeProcess:write`, `processStage:write`, `processHistory:read`, `write` on workflow/stage/subStage/project/train/wagon/material/delayReason |
| `fieldStaff` | Saha Personeli | `activeProcess:read`, `processStage:write`, `workflow:read`, `stage:read`, `subStage:read`, `delayReason:write` |
| `warehouse` | Depo Sorumlusu | `activeProcess:read`, `material:manage` |
| `qualityControl` | Kalite Kontrol / İzleyici | `read` on activeProcess, processStage, processHistory, workflow, stage, subStage, project, train, wagon, material, delayReason |

Deletion is granted only to `admin`, matching the matrix: the single delete row ("Süreci silme / iptal") is Yönetici-only, and no other row grants deletion to anyone else.

The matrix marks Saha Şefi's Tren Süreçleri access and Saha Personeli's stage access as "Kısmi — sadece kendi projesi". That is **record-level scoping and must be enforced by the backend**; the frontend grants the resource-level `read` and renders whatever the backend returns.

## Checking permissions

- `usePermissions()` (`src/hooks/usePermissions.ts`) → `can(resource, action)`, `canRead(resource)`, `hasPermission(required: string[], requireAll?)`. All of them honour the implication rules above.
- `useHasRole()` (`src/api/queries/useHasRole.ts`) keeps the older API (`hasRole`, `hasPermission`) and delegates to `usePermissions`.
- `<RoleWrapper resource={...} action={...}>` (`src/components/RoleWrapper.tsx`) renders `children` only when permitted, `fallback` (default `null`) otherwise. It still accepts `allowedRoles` / `requiredPermissions` for existing call sites.

## Where gating is applied

- **Sidebar** — `SidebarMenu` hides any item whose route has a permission the user lacks; a dropdown disappears when all of its children are hidden.
- **Routes** — `ROUTE_PERMISSIONS` (`src/consts/routePermissions.ts`) maps each page to its required permission, and `PermissionRouteGuard` (rendered by `AppShell`) shows `AccessDenied` instead of the page when a user reaches a URL directly.
- **List pages** — the `Create…Modal` button is wrapped in `RoleWrapper` with `<resource>:write`.
- **Table row actions** — the edit modal requires `<resource>:write`, the delete popover `<resource>:delete`.
- **Active process detail** — cancel requires `activeProcess:delete`, complete requires `activeProcess:write`, the new-process button in `Topbar` requires `activeProcess:write`.
- **Stage detail modal** — the whole action footer requires `processStage:write`.

## Adding a resource

1. Add it to `PERMISSION_RESOURCE` in `src/consts/permissions.ts`.
2. Add the four labels (`<resource>:read|write|delete|manage`) to `src/locales/{tr,en,de,ru}/permissions.json`.
3. Add the route to `ROUTE_PERMISSIONS` if it has a page.
4. Grant it in the relevant presets in `src/consts/rolePresets.ts`.
5. Wrap the module's create button and row actions in `RoleWrapper`.

The permission multiselect options are generated from the enum (`generatePermissionOptions`), so no separate option list needs updating.

## Not a security boundary

Per [conventions.md](conventions.md), authorization is enforced by the backend; every check described here is presentation only (hide what the user cannot do). The backend must recognise the same permission strings for the matrix to actually hold.
