import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { END_POINTS } from "@/consts/endpoints";

import { forwardSetCookies } from "../_cookieForward";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie") ?? "";
    const response = await axios.get(END_POINTS.auth.refresh, {
      withCredentials: true,
      validateStatus: () => true,
      headers: cookie ? { Cookie: cookie } : {},
    });

    const next =
      response.status >= 200 && response.status < 300
        ? NextResponse.json(response.data, { status: response.status })
        : NextResponse.json(
            response.data ?? { success: false, error: "Refresh failed" },
            { status: response.status },
          );

    forwardSetCookies(response.headers, next);
    return next;
  } catch (err: any) {
    // The thrown message can carry the backend host/port (ECONNREFUSED
    // 10.0.0.5:8080); keep it in the server log, never in the response.
    console.error("[api] refresh request failed", err?.code, err?.message);
    return NextResponse.json(
      { success: false, error: "Refresh failed" },
      { status: 500 },
    );
  }
}
