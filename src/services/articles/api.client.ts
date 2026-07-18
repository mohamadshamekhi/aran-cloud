import clientAxios from "@/lib/axios/client";
import type {
  ArticleListResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@/types/articles.types";

import { ARTICLE_ENDPOINTS } from "./endpoints";

export interface FetchArticlesParams {
  skip?: number;
  limit?: number;
}

export async function fetchArticles(
  params?: FetchArticlesParams
): Promise<ArticleListResponse> {
  const { data } = await clientAxios.get<ArticleListResponse>(
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

export async function createArticle(
  payload: CreateArticleRequest
): Promise<CreateArticleResponse> {
  const { data } = await clientAxios.post<CreateArticleResponse>(
    ARTICLE_ENDPOINTS.create,
    payload
  );
  return data;
}

export async function updateArticle(
  id: number,
  payload: UpdateArticleRequest
): Promise<UpdateArticleResponse> {
  const { data } = await clientAxios.put<UpdateArticleResponse>(
    ARTICLE_ENDPOINTS.update(id),
    payload
  );
  return data;
}

export async function deleteArticle(
  id: number
): Promise<DeleteArticleResponse> {
  const { data } = await clientAxios.delete<DeleteArticleResponse>(
    ARTICLE_ENDPOINTS.delete(id)
  );
  return data;
}
