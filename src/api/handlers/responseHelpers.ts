/**
 * Parses a JSON request body, returning null when the payload is missing or
 * malformed. Callers turn that into a 400 instead of letting request.json()
 * throw an unhandled 500.
 */
export async function readJsonBody<T = any>(
  request: Request,
): Promise<T | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as T) : null;
  } catch {
    return null;
  }
}

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
