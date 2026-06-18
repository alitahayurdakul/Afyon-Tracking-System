import { AxiosError } from "axios";

export const extractApiError = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object") {
    const ax = err as AxiosError<any>;
    const data = ax?.response?.data;
    if (data) {
      if (typeof data === "string") return data;
      const candidate =
        data.error ||
        data.message ||
        data.success ||
        data.detail ||
        data.title;
      if (typeof candidate === "string") return candidate;
    }
    const msg = (err as Error)?.message;
    if (msg) return msg;
  }
  return fallback;
};
