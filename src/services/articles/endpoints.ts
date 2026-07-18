import { BASE_URL } from "@/config/api-config";

export const ARTICLE_ENDPOINTS = {
  list: `${BASE_URL.MAIN_BASE_URL}/posts`,
  create: `${BASE_URL.MAIN_BASE_URL}/posts/add`,
  detail: (id: number) => `${BASE_URL.MAIN_BASE_URL}/posts/${id}`,
  update: (id: number) => `${BASE_URL.MAIN_BASE_URL}/posts/${id}`,
  delete: (id: number) => `${BASE_URL.MAIN_BASE_URL}/posts/${id}`,
} as const;
