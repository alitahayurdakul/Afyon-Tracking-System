// utils/permission.ts
import {
  Permission,
  PermissionAction,
  PermissionResource,
} from "@/consts/permissions";

export const getPermission = (
  resource: PermissionResource,
  action: PermissionAction,
): Permission => `${resource}:${action}`;
