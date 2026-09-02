import { useSelector } from "react-redux";

import { usePermissions } from "@/hooks/usePermissions";
import { RootState } from "@/redux/store";

export const useHasRole = () => {
  const roleName = useSelector(
    (state: RootState) => state.auth.user?.role?.roleName,
  );
  const { can, canRead, hasPermission } = usePermissions();

  const hasRole = (allowed: string[]) =>
    !!roleName && allowed.includes(roleName);

  return { hasRole, hasPermission, can, canRead };
};
