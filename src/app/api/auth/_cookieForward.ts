import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV !== "production";

const rewriteForLocalhost = (cookie: string): string => {
  if (!isDev) return cookie;
  return cookie
    .split(";")
    .map((part) => part.trim())
    .filter((part) => {
      const lower = part.toLowerCase();
      if (lower.startsWith("domain=")) return false;
      if (lower === "secure") return false;
      return true;
    })
    .map((part) => {
      const lower = part.toLowerCase();
      if (lower.startsWith("samesite=")) return "SameSite=Lax";
      return part;
    })
    .join("; ");
};

export const forwardSetCookies = (
  axiosHeaders: Record<string, any>,
  next: NextResponse,
): void => {
  const raw = axiosHeaders?.["set-cookie"];
  if (!raw) return;
  const cookies: string[] = Array.isArray(raw) ? raw : [raw];
  cookies.forEach((c) =>
    next.headers.append("set-cookie", rewriteForLocalhost(c)),
  );
};
