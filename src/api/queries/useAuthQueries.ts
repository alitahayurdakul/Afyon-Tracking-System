"use client";
import axios from "axios";
import { useDispatch } from "react-redux";

import { useMutation } from "@tanstack/react-query";

import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { clearAuth,setAccessToken } from "@/redux/slices/authSlice";

interface LoginPayload {
  email: string;
  pwd: string;
}

interface LoginResponse {
  accessToken: string;
  role?: { roleName: string; permissions: string[] };
}

const authAxios = axios.create({ withCredentials: true });

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await authAxios.post<LoginResponse>(
        CLIENT_END_POINTS.auth.login,
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      dispatch(setAccessToken(data.accessToken));
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      await authAxios.get(CLIENT_END_POINTS.auth.logout);
    },
    onSettled: () => {
      dispatch(clearAuth());
    },
  });
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { data } = await authAxios.get<{ accessToken: string }>(
      CLIENT_END_POINTS.auth.refresh,
    );
    return data?.accessToken ?? null;
  } catch {
    return null;
  }
};
