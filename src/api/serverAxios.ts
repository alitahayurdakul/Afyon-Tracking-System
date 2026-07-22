import { NextRequest } from "next/server";
import axios, { AxiosInstance } from "axios";

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
