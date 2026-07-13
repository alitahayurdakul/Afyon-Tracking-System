// components/RoleGuard/RoleGuard.tsx
"use client";

import type { ReactNode } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[]; // e.g. ["Super Admin", "Manager"]
  requiredPermissions?: string[]; // e.g. ["user:delete"]
  requireAll?: boolean; // default: false (OR logic)
  fallback?: ReactNode;
}

export const RoleWrapper = ({
  children,
  allowedRoles,
  requiredPermissions,
  requireAll = false,
  fallback = null,
}: RoleGuardProps) => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const roleName = role?.roleName;
  const permissions = role?.permissions ?? [];

  if (allowedRoles?.length) {
    if (!roleName || !allowedRoles.includes(roleName)) return <>{fallback}</>;
  }

  if (requiredPermissions?.length) {
    const hasPermission = requireAll
      ? requiredPermissions.every((p) => permissions.includes(p))
      : requiredPermissions.some((p) => permissions.includes(p));
    if (!hasPermission) return <>{fallback}</>;
  }

  return <>{children}</>;
};