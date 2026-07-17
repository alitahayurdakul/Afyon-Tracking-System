"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

/** Giriş yapan kullanıcının adını döndürür (token'daki fullname). */
export const useCurrentUserName = (): string => {
  const fullname = useSelector(
    (state: RootState) => state.auth.user?.fullname,
  );
  return fullname || "-"; 
};
