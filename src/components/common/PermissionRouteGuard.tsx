"use client";

import { useSelector } from "react-redux";

import { getRoutePermission } from "@/consts/routePermissions";
import { usePermissions } from "@/hooks/usePermissions";
import { usePathname } from "@/i18n/routing";
import { RootState } from "@/redux/store";
import { stripLocale } from "@/utils/stripLocale";

import { AccessDenied } from "./AccessDenied";

export const PermissionRouteGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = stripLocale(usePathname());
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { can } = usePermissions();

  const route = getRoutePermission(pathname);

  if (!accessToken || !route) return <>{children}</>;

  return can(route.resource, route.action) ? <>{children}</> : <AccessDenied />;
};
