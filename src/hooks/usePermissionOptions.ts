"use client";

import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

import {
  generatePermissionOptions,
  PermissionOption,
} from "@/consts/generatePermissionOptions";
import { parsePermission } from "@/consts/permissions";

export const usePermissionOptions = () => {
  const t = useTranslations("permissions");

  const permissionOptions = useMemo(
    () =>
      generatePermissionOptions().map((option: PermissionOption) => ({
        label: t(option.label),
        value: option.value,
      })),
    [t],
  );

  const toOptions = useCallback(
    (permissions: string[] = []) =>
      permissions.map((permission) => ({
        label: parsePermission(permission) ? t(permission) : permission,
        value: permission,
      })),
    [t],
  );

  return { permissionOptions, toOptions };
};
