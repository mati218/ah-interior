import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function createEntityHooks<T, TInput = Partial<T>>(
  endpoint: string,
  queryKey: string
) {
  function useList() {
    return useQuery({
      queryKey: [queryKey],
      queryFn: () => apiFetch<T[]>(endpoint),
    });
  }

  function useOne(id: string | undefined) {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: () => apiFetch<T>(`${endpoint}/${id}`),
      enabled: !!id,
    });
  }

  function useCreate() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: TInput) =>
        apiFetch<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  }

  function useUpdate() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: TInput }) =>
        apiFetch<T>(`${endpoint}/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  }

  function useRemove() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: string) =>
        apiFetch(`${endpoint}/${id}`, { method: "DELETE" }),
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  }

  return { useList, useOne, useCreate, useUpdate, useRemove };
}
