import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { success: false, error: err?.message ?? "Refresh failed" },
      { status: 500 },
    );
  }
}
