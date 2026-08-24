import { AxiosError } from "axios";

/**
 * Message to show the user for a failed request.
 *
 * Only a 4xx carries text meant for a person — it is the backend's own
 * user-facing copy ("this train number already exists"). Anything else (5xx,
 * or no response at all) only has a server placeholder or axios's own English
 * string ("Request failed with status code 500"), neither of which is
 * translated. In those cases the caller's `fallback` wins, which is always a
 * `t(...)` value and therefore follows the selected language.
 */
export const extractApiError = (err: unknown, fallback: string): string => {
  if (!err || typeof err !== "object") return fallback;

  const status = (err as AxiosError<any>)?.response?.status;
  if (typeof status !== "number" || status < 400 || status >= 500) {
    return fallback;
  }

  const data = (err as AxiosError<any>).response?.data;
  if (!data) return fallback;

  if (typeof data === "string") return data.trim() || fallback;

  const candidate =
    data.error || data.message || data.success || data.detail || data.title;

  return typeof candidate === "string" && candidate.trim()
    ? candidate
    : fallback;
};
