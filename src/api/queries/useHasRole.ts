import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export const useHasRole = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
//   const roleName = role?.roleName;
  const permissions = role?.permissions ?? [];

//   const hasRole = (allowed: string[]) => !!roleName && allowed.includes(roleName);

  const hasPermission = (required: string[], requireAll = false) =>
    requireAll
      ? required.every((p) => permissions.includes(p))
      : required.some((p) => permissions.includes(p));

  return { 
    // hasRole, 
    hasPermission };
};