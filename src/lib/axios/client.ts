import axios from "axios";

import { API_CONFIG } from "@/config/api-config";
import { getClientCookie } from "@/lib/cookie.client";

import { getApiErrorMessage } from "./error-handler";

const clientAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use((config) => {
  const token = getClientCookie(API_CONFIG.cookieName);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = API_CONFIG.loginPath;
        }
      }
      const message = getApiErrorMessage(error);
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export default clientAxios;
