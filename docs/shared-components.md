# Shared Component Reference

Prop contracts for the reusable components in `src/components/common/` and `src/components/formElements/`. Domain components are not listed — they follow the template in [frontend-patterns.md](frontend-patterns.md).

## Modal — `src/components/common/Modal.tsx`

Radix Dialog wrapper; visibility is driven by the `?modal=` URL param when `enableParams` (default `true`).

| Prop | Type / default | Notes |
|---|---|---|
| `name` | `string` (required) | Must match a constant from `src/consts/modals.ts`; modal is visible when `?modal=<name>` |
| `title` | `string \| ReactElement \| false` (required) | `false` hides the header title |
| `enableParams` | `boolean` = `true` | When true, open/close writes/removes the `modal` URL param |
| `open` / `setOpen` | controlled state (optional) | Used **alongside** the URL param: `visible = (modal === name) \|\| open`. List-body modals typically pass both |
| `toggleFn` | `(value: boolean) => void` | Extra callback on open/close |
| `closeFn` | `() => void` | Called on close — use to reset form state inside the modal |
| `modalButton` | `(clickFn, closeOnSuccess?) => ReactElement` | Render-prop trigger button (`clickFn` opens) |
| `footer` | `(clickFn) => ReactElement` | Render-prop footer (`clickFn` closes) |
| `closeElement` | `((clickFn) => ReactElement) \| false` | Custom close control; `false` removes the X icon |
| `isCloseOutside` / `isCloseEsc` | `boolean` | Allow closing by outside click / Escape (create/edit forms set both `false`) |
| `width` / `height` | `string` | e.g. `"900px"`, `"auto"` |
| `mobilePosition` | `"bottom" \| "center"` = `"bottom"` | |
| `loading` | `boolean` | Shows `NewSpinner` overlay |
| `forceMount`, `isPortal`, `parentContainer` | | Radix mount/portal control |
| `isDivider` | `boolean` = `false` | Divider under the title |
| `className`, `classNameContent`, `classNameCloseIcon`, `titleClassName` | `string` | Style hooks |

Side effects while open: body scroll is locked (with scrollbar-width compensation) and `pointer-events` is restored after a 200ms timer (Radix workaround). Typical usage: see `CreateTrainsModal` (`src/components/trains/create/CreateTrainsModal.tsx`).

## Table — `src/components/common/Table.tsx`

Generic TanStack Table wrapper `<Table<T> />`. Pagination is **server-side style**: you pass `currentPage` (1-indexed) + `totalCount`, and it derives `pageCount`; it does not slice data itself when `totalPage`/`totalCount` are provided.

| Prop | Type | Notes |
|---|---|---|
| `data` | `T[] \| undefined` | Rows (undefined while loading) |
| `columns` | `any[]` (required) | From a `create<Domain>TableColumns(t)` factory |
| `loading` | `boolean` (required) | Renders skeleton rows (`react-loading-skeleton`) |
| `isError` / `errorLabel` | | Error state (label defaults from `layout` translations) |
| `noDataLabel` | `string` | Empty-state text |
| `currentPage` / `pageSize` | `number` | **1-indexed page**; passing either enables pagination |
| `totalCount` or `totalPage` | `number` | `pageCount = ceil(totalCount / pageSize)`; `totalPage` wins if both |
| `onPageChange` | `(page: number) => void` | 1-indexed |
| `paginationElement` | `(table) => JSX.Element` | Render prop — pass the shared `Pagination` here |
| `extraButtonPanel` | `(table) => JSX.Element` | Toolbar render prop |
| `enablePinning` / `enableRowPinning` / `columnPinning` | | TanStack pinning |
| `draggableClassActive` / `isBlockDraggable` | `boolean` | Horizontal drag-to-scroll |
| `stickyHeader` | `boolean` | |
| `setSelectedRows`, `setTableInstance`, `isReset`/`setIsReset` | | Row selection / instance escape hatches |
| `rowHeight`, `defaultSkeletonRowCount` | | Skeleton sizing |

## Pagination — `src/components/common/Pagination.tsx`

`currentPage: number` (1-indexed), `pageSize: number`, `totalCount: number`, `onPageChange(page)` (receives the real 1-indexed page), optional `onPageSizeChange(size)`, `pageSizeOptions?: number[]` (use `DEFAULT_PAGE_SIZE_OPTIONS` from `tableConsts`), `siblingCount?`. Renders windowed page numbers with `...` dots.

## Form elements — `src/components/formElements/`

All inputs are **controlled via react-hook-form's `useController`** — they extend `UseControllerProps` and require `control` + `name`. Field lists in `consts/<domain>Consts.tsx` map `type` → component. Errors animate in via `ErrorLabel` (framer-motion).

### InputBox
`control`, `name`, `label: string | ReactElement | null`, `placeholder?`, `required?`, `maxLength?`, `maxLengthWithoutPunctuation?`, `type?` (html input type), `error?: { message }`, `disabled?`, plus style-hook classNames. Forwarded ref to the `<input>`.

### TextAreaBox
`control`, `name`, `label: string`, `placeholder?`, `required?`, `maxLength?`, `rows?`/`cols?`, `resize?: "none" | "both" | "horizontal" | "vertical"`, `error?: { message }`, `disabled?`, `changeExtraFn?(id)`, `limitMaxOneSpace?`, `visibleLimit?` (char counter), `charCountClassName?`.

### SelectBox
react-select based. `control`, `name`, `options: IOptionType[]` (`{ label, value }` — build with helpers in `src/types/optionsConverter.tsx` / `src/utils/selectUtils.tsx`), `multiselect?`, `multiLabel?`, `isClearable?`, `loading?` and `errorQuery?` (option-fetch states with `errorOptionQueryText`/`noOptionQueryText`), `placeholder?`, `defaultValue?`, `shouldUnregister?`, `menuIsOpen?`, `disabled?`, `required?`, `label?`.

### CheckBox
`control`, `name`, `label`, `defaultChecked?`, `disabled?`, `align?: "center" | "top" | "bottom"`, `ruleExtra?` (extra RHF rules), `clickFn?`, `changeExtraFn?(id)`, style classNames. (Component name is `CheckBox`, file `Checkbox.tsx`.)

### Button
Extends native button props (minus `type`). `type?: TypeButtons` (visual variant), `buttonType?: "button" | "submit" | "reset"`, `clickFn?`, `loading?` (spinner), `label?`, `size?`, `iconLeft?`/`iconRight?` (FontAwesome), `badge?: { count?, className?, loading? }`, `disabled?`.

### Badge / ErrorLabel / Option
- `Badge`: `count?`, `className?`, `loading?` (spinner while loading).
- `ErrorLabel`: `message: string`, `type?: "checkbox" | "input"` (picks animation), `className?` — rendered by the inputs themselves; rarely used directly.
- `Option`: option row used by SelectBox.

## Other common components

- **Topbar** (`common/Topbar.tsx`): `showCreateButton?: boolean` = `false`; renders header with `LanguageSelector`. Placed by every page above the ListBody.
- **DynamicTextWithTooltip**: `text?`, `contentBody?: ReactNode`, `lines?` = `2`, `textClassName?` — line-clamped text that shows a Radix tooltip on overflow; the standard cell renderer for long table text.
- **SelectedItemList** (default export): `selectedItems: IOptionType[]`, `pinnedItems?`, `setValue` (RHF setValue), `title`, `name` — chip list for multiselect values (e.g. wagons on the train form).
- **Error/empty/loading helpers**: `common/error/` (`ErrorChecker`, `ErrorComponent`, `NoDataComponent`), `common/loaders/` (`LoadingChecker`, `SkeletonContainer`), `loaders/NewSpinner.tsx`.
- **FilterForm** (`common/FilterForm.tsx`): shared filter bar used with `DataProvider` (`src/api/DataProvider.tsx`).
- **Captcha**, **InputField**, **NewModal**: ✔ **legacy — do not use in new work** (owner decision, 2026-08-20). New code uses `Modal` and `InputBox`.
