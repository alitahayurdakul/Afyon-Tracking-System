import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { success: false, error: err?.message ?? "Login failed" },
      { status: 500 },
    );
  }
}
