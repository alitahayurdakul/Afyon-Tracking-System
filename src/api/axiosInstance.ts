import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { CLIENT_END_POINTS } from "@/consts/endpoints";
import {
  getAccessTokenInMemory,
  setAccessTokenInMemory,
} from "@/redux/slices/authSlice";

export const axiosInstance = axios.create({
  withCredentials: true,
});

const isBrowser = (): boolean => typeof window !== "undefined";

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isBrowser()) {
      const token = getAccessTokenInMemory();
      if (token && !config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
);

let refreshPromise: Promise<string | null> | null = null;

const requestNewAccessToken = async (): Promise<string | null> => {
  if (!isBrowser()) return null;
  if (!refreshPromise) {
    refreshPromise = axios
      .get<{ accessToken: string }>(CLIENT_END_POINTS.auth.refresh, {
        withCredentials: true,
      })
      .then((res) => {
        const token = res.data?.accessToken ?? null;
        setAccessTokenInMemory(token);
        return token;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest || originalRequest._retry || !isBrowser()) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const url = originalRequest.url ?? "";
    const isAuthEndpoint =
      url.includes(CLIENT_END_POINTS.auth.login) ||
      url.includes(CLIENT_END_POINTS.auth.refresh) ||
      url.includes(CLIENT_END_POINTS.auth.logout);

    // This backend (verifyJWT) returns 403 for an expired/invalid access token,
    // not 401, so refresh-and-retry on both. A genuine permission denial (also
    // 403) will simply 403 again after the single retry and stop.
    if ((status === 401 || status === 403) && !isAuthEndpoint) {
      originalRequest._retry = true;
      const newToken = await requestNewAccessToken();
      if (newToken) {
        originalRequest.headers = {
          ...(originalRequest.headers ?? {}),
          Authorization: `Bearer ${newToken}`,
        };
        return axiosInstance.request(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
