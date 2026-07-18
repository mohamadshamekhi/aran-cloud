import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data !== undefined) {
          // toast.error(error.message || "خطا در دریافت اطلاعات");
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        // toast.error(error.message || "خطا در انجام عملیات");
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),
      },
      mutations: {
        retry: false,
      },
    },
  });
}
