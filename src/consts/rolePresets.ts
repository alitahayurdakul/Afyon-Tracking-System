import {
  managePermission,
  Permission,
  PERMISSION_RESOURCE,
  PERMISSION_RESOURCES,
  readPermission,
  writePermission,
} from "./permissions";

export const ROLE_PRESET = {
  ADMIN: "admin",
  FIELDCHIEF: "fieldChief",
  FIELDSTAFF: "fieldStaff",
  WAREHOUSE: "warehouse",
  QUALITYCONTROL: "qualityControl",
} as const;

export type RolePresetKey = (typeof ROLE_PRESET)[keyof typeof ROLE_PRESET];

export interface IRolePreset {
  key: RolePresetKey;
  permissions: Permission[];
}

const ADMIN_PERMISSIONS = PERMISSION_RESOURCES.map((resource) =>
  managePermission(resource),
);

const FIELD_CHIEF_PERMISSIONS: Permission[] = [
  readPermission(PERMISSION_RESOURCE.PROCESSTRAIN),
  writePermission(PERMISSION_RESOURCE.ACTIVEPROCESS),
  writePermission(PERMISSION_RESOURCE.PROCESSSTAGE),
  readPermission(PERMISSION_RESOURCE.PROCESSHISTORY),
  writePermission(PERMISSION_RESOURCE.WORKFLOW),
  writePermission(PERMISSION_RESOURCE.STAGE),
  writePermission(PERMISSION_RESOURCE.SUBSTAGE),
  writePermission(PERMISSION_RESOURCE.PROJECT),
  writePermission(PERMISSION_RESOURCE.TRAIN),
  writePermission(PERMISSION_RESOURCE.WAGON),
  writePermission(PERMISSION_RESOURCE.MATERIAL),
  writePermission(PERMISSION_RESOURCE.DELAYREASON),
];

const FIELD_STAFF_PERMISSIONS: Permission[] = [
  readPermission(PERMISSION_RESOURCE.ACTIVEPROCESS),
  writePermission(PERMISSION_RESOURCE.PROCESSSTAGE),
  readPermission(PERMISSION_RESOURCE.WORKFLOW),
  readPermission(PERMISSION_RESOURCE.STAGE),
  readPermission(PERMISSION_RESOURCE.SUBSTAGE),
  writePermission(PERMISSION_RESOURCE.DELAYREASON),
];

const WAREHOUSE_PERMISSIONS: Permission[] = [
  readPermission(PERMISSION_RESOURCE.ACTIVEPROCESS),
  managePermission(PERMISSION_RESOURCE.MATERIAL),
];

const QUALITY_CONTROL_PERMISSIONS: Permission[] = [
  readPermission(PERMISSION_RESOURCE.ACTIVEPROCESS),
  readPermission(PERMISSION_RESOURCE.PROCESSSTAGE),
  readPermission(PERMISSION_RESOURCE.PROCESSHISTORY),
  readPermission(PERMISSION_RESOURCE.WORKFLOW),
  readPermission(PERMISSION_RESOURCE.STAGE),
  readPermission(PERMISSION_RESOURCE.SUBSTAGE),
  readPermission(PERMISSION_RESOURCE.PROJECT),
  readPermission(PERMISSION_RESOURCE.TRAIN),
  readPermission(PERMISSION_RESOURCE.WAGON),
  readPermission(PERMISSION_RESOURCE.MATERIAL),
  readPermission(PERMISSION_RESOURCE.DELAYREASON),
];

export const ROLE_PRESETS: IRolePreset[] = [
  { key: ROLE_PRESET.ADMIN, permissions: ADMIN_PERMISSIONS },
  { key: ROLE_PRESET.FIELDCHIEF, permissions: FIELD_CHIEF_PERMISSIONS },
  { key: ROLE_PRESET.FIELDSTAFF, permissions: FIELD_STAFF_PERMISSIONS },
  { key: ROLE_PRESET.WAREHOUSE, permissions: WAREHOUSE_PERMISSIONS },
  { key: ROLE_PRESET.QUALITYCONTROL, permissions: QUALITY_CONTROL_PERMISSIONS },
];

export const getRolePreset = (key: string): IRolePreset | undefined =>
  ROLE_PRESETS.find((preset) => preset.key === key);
