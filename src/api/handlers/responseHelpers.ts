export function createJsonSuccess(data?: any, status = 200): Response {
  return Response.json({ success: true, data }, { status });
}

export function createJsonOnlyData(data?: any): Response {
  return Response.json(data);
}

export function createJsonError(message = "Hata oluştu", status = 500): Response {
  return Response.json({ success: false, error: message }, { status });
}

export function extractErrorMessage(error: unknown, fallback = "Hata oluştu"): string {
  if (!error) return fallback;
  if (typeof error === "string") return error;

  const maybeAxiosError = error as Record<string, any>;
  const data = maybeAxiosError.response?.data;
  if (typeof data === "string") return data;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;

  if (error instanceof Error) return error.message || fallback;
  if (typeof maybeAxiosError.message === "string") return maybeAxiosError.message;

  return fallback;
}
