import { getServerAxios } from "@/lib/axios/server";
import { ARTICLE_ENDPOINTS } from "./endpoints";
import type {
  ArticleDetailResponse,
  ArticleListResponse,
} from "@/types/articles.types";
import type { FetchArticlesParams } from "./api.client";

export async function fetchArticlesServer(
  params?: FetchArticlesParams
): Promise<ArticleListResponse> {
  const axiosInstance = await getServerAxios();
  const { data } = await axiosInstance.get<ArticleListResponse>(
    ARTICLE_ENDPOINTS.list,
    {
      params: {
        skip: params?.skip ?? 1,
        limit: params?.limit ?? 20,
      },
    }
  );
  return data;
}

export async function fetchArticleServer(
  _id: number
): Promise<ArticleDetailResponse> {
  const axiosInstance = await getServerAxios();
  const { data } = await axiosInstance.get<ArticleDetailResponse>(
    ARTICLE_ENDPOINTS.detail(_id)
  );
  return data;
}
