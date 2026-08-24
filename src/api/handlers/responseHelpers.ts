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

/**
 * Maps a failed backend call to the status the client should see. Flattening
 * everything to 500 hides the difference between "not found", "forbidden" and
 * a real server fault, and in particular stops axiosInstance from refreshing
 * the access token, since that only retries on 401/403.
 */
export function extractErrorStatus(error: unknown, fallback = 500): number {
  const status = (error as Record<string, any>)?.response?.status;
  return typeof status === "number" && status >= 400 && status <= 599
    ? status
    : fallback;
}

/** Longest backend message we are willing to relay verbatim. */
const MAX_RELAYED_MESSAGE_LENGTH = 300;

/** An HTML error page or similar tells the user nothing; don't relay it. */
const looksLikeMarkup = (value: string): boolean =>
  /^\s*</.test(value) || /<\/?(?:html|body|head|pre|div|p)\b/i.test(value);

const relayable = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > MAX_RELAYED_MESSAGE_LENGTH || looksLikeMarkup(text)) {
    return null;
  }
  return text;
};

/**
 * Message the client is allowed to see for a failed backend call.
 *
 * 4xx messages are relayed: they describe something the caller can correct
 * ("this train number already exists") and are the backend's own user-facing
 * copy. Anything else is replaced by `fallback`, because the text of a 5xx or
 * a transport failure is an internal detail — it can carry a stack trace, an
 * HTML error page, or the backend host and port (`connect ECONNREFUSED
 * 10.0.0.5:8080`), none of which may reach a caller. Use `createErrorResponse`
 * so those details still reach the server log.
 */
export function extractErrorMessage(error: unknown, fallback = "Hata oluştu"): string {
  if (!error) return fallback;

  const status = (error as Record<string, any>)?.response?.status;
  const isClientError = typeof status === "number" && status >= 400 && status < 500;
  if (!isClientError) return fallback;

  const data = (error as Record<string, any>).response?.data;
  return (
    relayable(data) ??
    relayable(data?.message) ??
    relayable(data?.error) ??
    relayable(data?.detail) ??
    fallback
  );
}

/**
 * Standard catch-block response: relays a safe message with the upstream
 * status, and logs the full detail server-side for anything that is not a
 * client error, since those are the failures nobody would otherwise see.
 */
export function createErrorResponse(
  error: unknown,
  fallback = "Hata oluştu",
): Response {
  const status = extractErrorStatus(error);

  if (status >= 500) {
    const axiosError = error as Record<string, any>;
    console.error("[api] backend call failed", {
      status,
      method: axiosError?.config?.method,
      url: axiosError?.config?.url,
      code: axiosError?.code,
      message: (error as Error)?.message,
    });
  }

  return createJsonError(extractErrorMessage(error, fallback), status);
}
