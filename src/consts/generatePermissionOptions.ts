import {
  PERMISSION_ACTION,
  PERMISSION_RESOURCE,
  PermissionAction,
  PermissionResource,
} from "./permissions";

export interface PermissionOption {
  value: `${PermissionResource}:${PermissionAction}`;
  label: string;
}

export const generatePermissionOptions = (): PermissionOption[] => {
  const resources = Object.values(PERMISSION_RESOURCE);
  const actions = Object.values(PERMISSION_ACTION);

  return resources.flatMap((resource) =>
    actions.map((action) => ({
      value: `${resource}:${action}` as PermissionOption["value"],
      label: `${resource}:${action}`,
    })),
  );
};
