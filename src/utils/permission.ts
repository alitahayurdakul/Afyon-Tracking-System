// utils/permission.ts
import {
  Permission,
  PermissionAction,
  PermissionResource,
} from "@/consts/permissions";

export const permission = (
  resource: PermissionResource,
  action: PermissionAction,
): Permission => `${resource}:${action}`;
