import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { END_POINTS } from "@/consts/endpoints";

import { forwardSetCookies } from "../_cookieForward";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie") ?? "";
    const response = await axios.get(END_POINTS.auth.logout, {
      withCredentials: true,
      validateStatus: () => true,
      headers: cookie ? { Cookie: cookie } : {},
    });

    const next = new NextResponse(null, { status: response.status });
    forwardSetCookies(response.headers, next);
    next.cookies.set("jwt", "", { path: "/", maxAge: 0 });
    return next;
  } catch (err: any) {
    // The thrown message can carry the backend host/port (ECONNREFUSED
    // 10.0.0.5:8080); keep it in the server log, never in the response.
    console.error("[api] logout request failed", err?.code, err?.message);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 },
    );
  }
}
