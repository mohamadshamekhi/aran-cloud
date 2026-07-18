export const BASE_URL = {
  MAIN_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://dummyjson.com",
};

export const API_CONFIG = {
  cookieName: "arvan-cloud-session",
  loginPath: "/login",
  dashboardPath: "/dashboard",
} as const;
