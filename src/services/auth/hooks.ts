import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./api";
import { LoginRequest } from "@/types/tags.types copy";

export const authKeys = {
  all: ["login"] as const,
  list: () => [...authKeys.all, "login"] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
