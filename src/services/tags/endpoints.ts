import { BASE_URL } from "@/config/api-config";

export const TAG_ENDPOINTS = {
  list: `${BASE_URL.MAIN_BASE_URL}/posts/tag-list`,
  create: `${BASE_URL.MAIN_BASE_URL}/posts/add`,
} as const;
