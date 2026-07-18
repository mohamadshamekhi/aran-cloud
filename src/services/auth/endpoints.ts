import { BASE_URL } from "@/config/api-config";

export const AUTH_ENDPOINTS = {
  login: `${BASE_URL.MAIN_BASE_URL}/auth/login`,
} as const;
