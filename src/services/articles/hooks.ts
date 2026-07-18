import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  type FetchArticlesParams,
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from "./api.client";
import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from "@/types/articles.types";

export const articlesKeys = {
  all: ["articles"] as const,
  list: (params?: FetchArticlesParams) =>
    [...articlesKeys.all, "list", params] as const,
  detail: (id: number) => [...articlesKeys.all, "detail", id] as const,
};

export function useCategories(params?: FetchArticlesParams) {
  return useQuery({
    queryKey: articlesKeys.list(params),
    queryFn: () => fetchArticles(params),
    select: (res) => res,
    placeholderData: keepPreviousData,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateArticleRequest) => createArticle(payload),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: articlesKeys.all });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateArticleRequest;
    }) => updateArticle(id, payload),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: articlesKeys.all });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteArticle(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: articlesKeys.all });
    },
  });
}
