"use client";

import type { ReactNode } from "react";
import { useSelector } from "react-redux";

import { PermissionAction, PermissionResource } from "@/consts/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { RootState } from "@/redux/store";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
  resource?: PermissionResource;
  action?: PermissionAction;
  requireAll?: boolean;
  fallback?: ReactNode;
}

export const RoleWrapper = ({
  children,
  allowedRoles,
  requiredPermissions,
  resource,
  action,
  requireAll = false,
  fallback = null,
}: RoleGuardProps) => {
  const roleName = useSelector(
    (state: RootState) => state.auth.user?.role?.roleName,
  );
  const { can, hasPermission } = usePermissions();

  if (allowedRoles?.length) {
    if (!roleName || !allowedRoles.includes(roleName)) return <>{fallback}</>;
  }

  if (resource && action && !can(resource, action)) {
    return <>{fallback}</>;
  }

  if (
    requiredPermissions?.length &&
    !hasPermission(requiredPermissions, requireAll)
  ) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
