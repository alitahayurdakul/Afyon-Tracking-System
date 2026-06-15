export function getErrorMessage(error: unknown, fallback = "Hata oluştu"): string {
  if (!error) return fallback;
  if (typeof error === "string") return error;

  const maybeAxiosError = error as {
    response?: {
      data?:
        | string
        | {
            error?: string;
            message?: string;
            errors?: Array<{ message?: string }>;
          };
    };
    message?: string;
  };

  const data = maybeAxiosError.response?.data;
  if (typeof data === "string") return data;
  if (typeof data?.error === "string") return data.error;
  if (typeof data?.message === "string") return data.message;
  if (Array.isArray(data?.errors) && typeof data.errors[0]?.message === "string") {
    return data.errors[0].message;
  }

  if (error instanceof Error) return error.message || fallback;
  if (typeof maybeAxiosError.message === "string") return maybeAxiosError.message;

  return fallback;
}
