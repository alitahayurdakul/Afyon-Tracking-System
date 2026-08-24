import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { END_POINTS } from "@/consts/endpoints";

import { forwardSetCookies } from "../_cookieForward";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post(END_POINTS.auth.login, body, {
      withCredentials: true,
      validateStatus: () => true,
    });

    const next =
      response.status >= 200 && response.status < 300
        ? NextResponse.json(response.data, { status: response.status })
        : NextResponse.json(
            response.data ?? { success: false, error: "Login failed" },
            { status: response.status },
          );

    forwardSetCookies(response.headers, next);
    return next;
  } catch (err: any) {
    // The thrown message can carry the backend host/port (ECONNREFUSED
    // 10.0.0.5:8080); keep it in the server log, never in the response.
    console.error("[api] login request failed", err?.code, err?.message);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 },
    );
  }
}
