import { cookies } from "next/headers";

import axios from "axios";

import { API_CONFIG } from "@/config/api-config";

import { getApiErrorMessage } from "./error-handler";

export async function getServerAxios() {
  const cookieStore = await cookies();
  const token = cookieStore.get(API_CONFIG.cookieName)?.value;

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        const message = getApiErrorMessage(error);
        return Promise.reject(new Error(message));
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
