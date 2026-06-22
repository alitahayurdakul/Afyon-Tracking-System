"use client";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { CLIENT_END_POINTS } from "@/consts/endpoints";

interface LoginPayload {
  email: string;
  pwd: string;
}

interface LoginResponse {
  accessToken: string;
  role?: { roleName: string; permissions: string[] };
}

// Backend hazır olduğunda kullanılacak instance.
// const authAxios = axios.create({ withCredentials: true });

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      // TODO(api): Backend hazır olduğunda mock dönüşü kaldırıp gerçek isteği aktif edin.
      // const { data } = await authAxios.post<LoginResponse>(
      //   CLIENT_END_POINTS.auth.login,
      //   payload,
      // );
      // return data;

      // Şimdilik mock: backend olmadığı için her zaman başarılı kabul edilir.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return {
        accessToken: "mock-access-token",
        role: { roleName: "Admin", permissions: [] },
      };
    },
    onSuccess: () => {
      // TODO(api): Token saklama (ör. authSlice / cookie) backend hazır olunca eklenecek.
      // dispatch(setAccessToken(data.accessToken));
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      // TODO(api): Backend hazır olduğunda gerçek logout isteğini aktif edin.
      // await authAxios.get(CLIENT_END_POINTS.auth.logout);
      await new Promise((resolve) => setTimeout(resolve, 300));
    },
  });
};
