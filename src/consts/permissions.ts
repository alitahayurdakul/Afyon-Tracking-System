export const PERMISSION_RESOURCE = {
  PROCESSTRAIN: "processTrain",
  ACTIVEPROCESS: "activeProcess",
  PROCESSSTAGE: "processStage",
  PROCESSHISTORY: "processHistory",
  WORKFLOW: "workflow",
  STAGE: "stage",
  SUBSTAGE: "subStage",
  PROJECT: "project",
  TRAIN: "train",
  WAGON: "wagon",
  MATERIAL: "material",
  DELAYREASON: "delayReason",
  USER: "user",
  ROLE: "role",
} as const;

export const PERMISSION_ACTION = {
  READ: "read", // view
  WRITE: "write", // create and edit
  DELETE: "delete", // delete
  MANAGE: "manage", // all operations - view, edit, delete and also create
} as const;

export type PermissionResource =
  (typeof PERMISSION_RESOURCE)[keyof typeof PERMISSION_RESOURCE];
export type PermissionAction =
  (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION];

export type Permission = `${PermissionResource}:${PermissionAction}`;

export const PERMISSION_RESOURCES = Object.values(PERMISSION_RESOURCE);
export const PERMISSION_ACTIONS = Object.values(PERMISSION_ACTION);

export const buildPermission = (
  resource: PermissionResource,
  action: PermissionAction,
): Permission => `${resource}:${action}`;

export const parsePermission = (
  permission: string,
): { resource: PermissionResource; action: PermissionAction } | null => {
  const [resource, action] = permission.split(":");
  if (
    !PERMISSION_RESOURCES.includes(resource as PermissionResource) ||
    !PERMISSION_ACTIONS.includes(action as PermissionAction)
  ) {
    return null;
  }
  return {
    resource: resource as PermissionResource,
    action: action as PermissionAction,
  };
};

const MANAGE_IMPLIES: PermissionAction[] = [
  PERMISSION_ACTION.READ,
  PERMISSION_ACTION.WRITE,
  PERMISSION_ACTION.DELETE,
  PERMISSION_ACTION.MANAGE,
];

const WRITE_IMPLIES: PermissionAction[] = [
  PERMISSION_ACTION.READ,
  PERMISSION_ACTION.WRITE,
];

const DELETE_IMPLIES: PermissionAction[] = [
  PERMISSION_ACTION.READ,
  PERMISSION_ACTION.DELETE,
];

export const impliedActions = (
  action: PermissionAction,
): PermissionAction[] => {
  if (action === PERMISSION_ACTION.MANAGE) return MANAGE_IMPLIES;
  if (action === PERMISSION_ACTION.WRITE) return WRITE_IMPLIES;
  if (action === PERMISSION_ACTION.DELETE) return DELETE_IMPLIES;
  return [PERMISSION_ACTION.READ];
};

export const grants = (
  granted: string,
  resource: PermissionResource,
  action: PermissionAction,
): boolean => {
  const parsed = parsePermission(granted);
  if (!parsed || parsed.resource !== resource) return false;
  return impliedActions(parsed.action).includes(action);
};

export const readPermission = (resource: PermissionResource): Permission =>
  buildPermission(resource, PERMISSION_ACTION.READ);
export const writePermission = (resource: PermissionResource): Permission =>
  buildPermission(resource, PERMISSION_ACTION.WRITE);
export const deletePermission = (resource: PermissionResource): Permission =>
  buildPermission(resource, PERMISSION_ACTION.DELETE);
export const managePermission = (resource: PermissionResource): Permission =>
  buildPermission(resource, PERMISSION_ACTION.MANAGE);
