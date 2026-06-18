import axios, { AxiosInstance } from "axios";
import { NextRequest } from "next/server";

export const createServerAxios = (request: NextRequest): AxiosInstance => {
  const authorization = request.headers.get("authorization");
  const cookie = request.headers.get("cookie");

  const instance = axios.create({
    withCredentials: true,
    headers: {
      ...(authorization ? { Authorization: authorization } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });

  return instance;
};
