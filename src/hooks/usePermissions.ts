"use client";

import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  grants,
  parsePermission,
  PERMISSION_ACTION,
  PermissionAction,
  PermissionResource,
} from "@/consts/permissions";
import { RootState } from "@/redux/store";

export const usePermissions = () => {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.role?.permissions,
  );

  const granted = useMemo(() => permissions ?? [], [permissions]);

  const can = useCallback(
    (resource: PermissionResource, action: PermissionAction) =>
      granted.some((permission) => grants(permission, resource, action)),
    [granted],
  );

  const canRead = useCallback(
    (resource: PermissionResource) => can(resource, PERMISSION_ACTION.READ),
    [can],
  );

  const hasPermission = useCallback(
    (required: string[], requireAll = false) => {
      const check = (permission: string) => {
        const parsed = parsePermission(permission);
        if (!parsed) return granted.includes(permission);
        return can(parsed.resource, parsed.action);
      };
      return requireAll ? required.every(check) : required.some(check);
    },
    [can, granted],
  );

  return { permissions: granted, can, canRead, hasPermission };
};
