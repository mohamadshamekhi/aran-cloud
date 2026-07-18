import clientAxios from "@/lib/axios/client";

import { TAG_ENDPOINTS } from "./endpoints";
import {
  CreateTagsRequest,
  CreateTagsResponse,
  TagsListResponse,
} from "@/types/tags.types";

export async function fetchTags(): Promise<TagsListResponse> {
  const { data } = await clientAxios.get<TagsListResponse>(TAG_ENDPOINTS.list);
  return data;
}

export async function createTag(
  payload: CreateTagsRequest
): Promise<CreateTagsResponse> {
  const { data } = await clientAxios.post<CreateTagsResponse>(
    TAG_ENDPOINTS.create,
    payload
  );
  return data;
}
