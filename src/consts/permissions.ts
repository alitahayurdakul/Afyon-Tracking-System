export const PERMISSION_RESOURCE = {
  ACTIVEPROCESS: "activeProcess",
  USER: "user",
  ROLE: "role",
  STAGE: "stage",
} as const;

export const PERMISSION_ACTION = {
  READ: "read", // view
  WRITE: "write", // edit
  DELETE: "delete", // delete
  MANAGE: "manage", // all operations - view, edit, delete and also create
} as const;

export type PermissionResource =
  (typeof PERMISSION_RESOURCE)[keyof typeof PERMISSION_RESOURCE];
export type PermissionAction =
  (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION];

export type Permission = `${PermissionResource}:${PermissionAction}`;
