import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTag, fetchTags } from "./api";
import { CreateTagsRequest } from "@/types/tags.types";

export const tagsKeys = {
  all: ["tags"] as const,
  list: () => [...tagsKeys.all, "list"] as const,
};

export function useTags() {
  return useQuery({
    queryKey: tagsKeys.list(),
    queryFn: () => fetchTags(),
    select: (res) => res,
    placeholderData: keepPreviousData,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTagsRequest) => createTag(payload),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: tagsKeys.all });
    },
  });
}
