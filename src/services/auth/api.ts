import clientAxios from "@/lib/axios/client";

import { AUTH_ENDPOINTS } from "./endpoints";
import { LoginRequest, LoginResponse } from "@/types/tags.types copy";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await clientAxios.post<LoginResponse>(AUTH_ENDPOINTS.login, {
    ...payload,
    expiresInMins: 30,
  });
  return data;
}
