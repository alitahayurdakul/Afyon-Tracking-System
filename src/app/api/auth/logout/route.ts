import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { success: false, error: err?.message ?? "Logout failed" },
      { status: 500 },
    );
  }
}
